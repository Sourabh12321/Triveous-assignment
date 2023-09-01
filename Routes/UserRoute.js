const express = require("express");
const bcrypt = require("bcrypt");
const { userModel } = require("../models/UserModel")
require("dotenv").config();
const jwt = require("jsonwebtoken");

const UserRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User login signup
 */

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with a name, email, and password.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               name: John Doe
 *               email: johndoe@example.com
 *               password: secretPassword
 *     responses:
 *       200:
 *         description: User registered successfully.
 *       409:
 *         description: User already registered with this email.
 *       500:
 *         description: Something went wrong.
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user with email and password and return a JWT token.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: johndoe@example.com
 *               password: secretPassword
 *     responses:
 *       200:
 *         description: User login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 Token:
 *                   type: string
 *       401:
 *         description: User not found or authentication failed.
 *       500:
 *         description: Something went wrong.
 */


UserRouter.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user with the given email already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});

UserRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // Create a JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.KEY,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});



module.exports = {
    UserRouter
}