const express = require('express');
const router = express.Router();
const { User, Order, Review, OrderItem, Product } = require('../models');

// Middleware to check admin token
const isAdmin = (req, res, next) => {
    const token = req.headers['x-admin-token'];
    // In a real app, verify JWT. Here we use a simple shared secret for demonstration as requested "secure" but simple "email and code"
    // The frontend will send this token after successful login.
    if (token === 'simple-admin-token-secure') {
        return next();
    }
    return res.status(403).json({ error: 'Unauthorized access' });
};

// Admin Login
// Admin Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        // NOTE: Using plain text password as per existing auth.js pattern. 
        // In production, use bcrypt.
        if (user && user.password === password && user.isAdmin) {
            // Return a simple token (in real app, sign a JWT)
            return res.json({ success: true, token: 'simple-admin-token-secure', user: { username: user.username, email: user.email } });
        }

        return res.status(401).json({ error: 'Invalid email/password or not an admin' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// Get All Users (Visitors)
router.get('/users', isAdmin, async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['createdAt', 'DESC']]
        });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get All Orders
router.get('/orders', isAdmin, async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                {
                    model: OrderItem,
                    include: [Product]
                },
                {
                    model: User,
                    attributes: ['username', 'email']
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get All Reviews
router.get('/reviews', isAdmin, async (req, res) => {
    try {
        const reviews = await Review.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
