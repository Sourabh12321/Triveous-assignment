const express = require("express");
const { auth } = require("../auth/auth");
const { Cart } = require("../models/CartModel")

const CartRouter = express.Router();

CartRouter.post('/add-to-cart/:productId', auth, async (req, res) => {
    try {
        const userId = req.userData.userId; // Get the user ID from the auth middleware
        const productId = req.params.productId; // Get the product ID from the route parameter

        // Find the user's cart
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // If the cart doesn't exist, create a new one
            cart = new Cart({
                user: userId,
                products: [{ product: productId, quantity: 1 }] // Add product with quantity 1
            });

            await cart.save();

            res.status(201).json({ message: 'Product added to cart successfully' });
        } else {
            // Check if the product is already in the cart
            const productIndex = cart.products.findIndex(
                (item) => item.product.toString() === productId
            );

            if (productIndex !== -1) {
                res.status(200).json({ message: 'Product is already in cart' });
            } else {
                cart.products.push({ product: productId, quantity: 1 });
                await cart.save();
                res.status(201).json({ message: 'Product added to cart successfully' });
            }
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});
CartRouter.delete('/remove-from-cart/:productId', auth, async (req, res) => {
    try {
        const userId = req.userData.userId; // Get the user ID from the auth middleware
        const productId = req.params.productId; // Get the product ID from the route parameter

        // Find the user's cart
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Remove the product from the cart's products array
        const productIndex = cart.products.findIndex(
            (item) => item.product.toString() === productId
        );

        if (productIndex !== -1) {
            cart.products.splice(productIndex, 1);
            await cart.save();
            res.status(200).json({ message: 'Product removed from cart successfully' });
        } else {
            res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});

CartRouter.get('/cart', auth, async (req, res) => {
    try {
        const userId = req.userData.userId; // Get the user ID from the auth middleware

        // Find the user's cart
        const cart = await Cart.findOne({ user: userId }).populate('products.product');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(cart.products);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});

// Route to increase the quantity of a product in the cart
CartRouter.post('/increase-quantity/:productId', auth, async (req, res) => {
    try {
        const userId = req.userData.userId; // Get the user ID from the auth middleware
        const productId = req.params.productId; // Get the product ID from the route parameter

        // Find the user's cart
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the product in the cart
        const productIndex = cart.products.findIndex(
            (item) => item.product.toString() === productId
        );

        if (productIndex !== -1) {
            cart.products[productIndex].quantity++;
            await cart.save();
            res.status(200).json({ message: 'Product quantity increased' });
        } else {
            res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});

// Route to decrease the quantity of a product in the cart
CartRouter.post('/decrease-quantity/:productId', auth, async (req, res) => {
    try {
        const userId = req.userData.userId; // Get the user ID from the auth middleware
        const productId = req.params.productId; // Get the product ID from the route parameter

        // Find the user's cart
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the product in the cart
        const productIndex = cart.products.findIndex(
            (item) => item.product.toString() === productId
        );

        if (productIndex !== -1) {
            if (cart.products[productIndex].quantity > 1) {
                cart.products[productIndex].quantity--;
            } else {
                cart.products.splice(productIndex, 1); // Remove the product if quantity is 0
            }
            await cart.save();
            res.status(200).json({ message: 'Product quantity updated' });
        } else {
            res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});




CartRouter.get("/", (req, res) => {
    res.send("cart")
})

module.exports = {
    CartRouter
}

