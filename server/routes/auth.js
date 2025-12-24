const express = require('express');
const router = express.Router();
const { User } = require('../models');

// User Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid email or password' }); // In real app use bcrypt
        }

        // Return simple user object (mock token)
        res.json({ success: true, user: { id: user.id, username: user.username, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// User Signup
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password, city } = req.body;

        // Simple check if user exists
        const existing = await User.findOne({ where: { email } });
        if (existing) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = await User.create({ username, email, password, city });
        res.json({ success: true, user: { id: newUser.id, username: newUser.username, email: newUser.email } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
