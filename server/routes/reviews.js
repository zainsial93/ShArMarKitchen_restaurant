const express = require('express');
const router = express.Router();
const { Review } = require('../models');

// Submit Review
router.post('/', async (req, res) => {
    try {
        const { userName, city, rating, feedback, suggestions } = req.body;
        const review = await Review.create({
            userName,
            city,
            rating,
            feedback,
            suggestions
        });
        res.status(201).json({ message: 'Review submitted', review });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Public get all reviews
router.get('/public', async (req, res) => {
    try {
        const reviews = await Review.findAll({
            order: [['createdAt', 'DESC']],
            limit: 6 // Show latest 6
        });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
