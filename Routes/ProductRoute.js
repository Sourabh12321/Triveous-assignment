const express = require("express");
const { auth } = require("../auth/auth")
const { Product } = require("../models/ProductModel")
const ProductRouter = express.Router();

// Assuming you have a Product model with fields: name, image, price, and type

ProductRouter.post('/AddProduct', auth, async (req, res) => {
    try {
        const { title, image, price, type } = req.body;

        // Create a new product
        const newProduct = new Product({
            title,
            image,
            price,
            category,
            availablity,
        });

        // Save the product to the database
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
        const category = req.query.category; // Retrieve category from query parameter
        console.log(category);
        // Find products by category
        const products = await Product.find({ "category": category });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});
ProductRouter.get('/product-info/:id', async (req, res) => {
    try {
        let id = req.params.id;

        // Find products by category and user
        const products = await Product.find({ "_id": id });

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});


module.exports = {
    ProductRouter
}