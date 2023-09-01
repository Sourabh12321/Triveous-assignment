const express = require("express");
const { auth } = require("../auth/auth")
const { Product } = require("../models/ProductModel")
const ProductRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management endpoints
 */

/**
 * @swagger
 * /products/AddProduct:
 *   post:
 *     summary: Add a new product
 *     description: Add a new product with title, image, price, category, and availability.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               availablity:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Product added successfully.
 *       500:
 *         description: Something went wrong.
 *       401:
 *         description: Unauthorized - JWT token required.
 */

/**
 * @swagger
 * /products/product-types:
 *   get:
 *     summary: Get product categories
 *     description: Retrieve distinct product categories.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 category:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Something went wrong.
 */

/**
 * @swagger
 * /products/products:
 *   get:
 *     summary: Get products
 *     description: Retrieve a list of products. You can filter by category using the `category` query parameter.
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Optional category filter.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Something went wrong.
 */
ProductRouter.post('/AddProduct', auth, async (req, res) => {
    try {
        const { title, image, price, category } = req.body;

        
        const newProduct = new Product({
            title,
            image,
            price,
            category,
            
        });

        
        await newProduct.save();

        res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});

ProductRouter.get('/product-types', async (req, res) => {
    try {
        const productTypes = await Product.distinct('category');
        res.status(200).json(productTypes);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});
ProductRouter.get('/products', async (req, res) => {
    try {
        const category = req.query.category; 
        
        let products
        
        if(category){
            products = await Product.find({ "category": category });
            res.status(200).json(products);
            console.log(category);
            console.log("one")
        }else{
            console.log("all")
            products = await Product.find();
            res.status(200).json(products);
        }
        
        
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});

/**
 * @swagger
 * /products/product-info/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Retrieve a specific product by its ID.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Something went wrong.
 */

ProductRouter.get('/product-info/:id', async (req, res) => {
    try {
        let id = req.params.id;

        
        const products = await Product.find({ "_id": id });

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});


module.exports = {
    ProductRouter
}