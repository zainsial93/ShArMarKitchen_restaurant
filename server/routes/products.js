const express = require('express');
const router = express.Router();
const { Product, Category } = require('../models');

// GET all products (with optional category filter)
router.get('/', async (req, res) => {
    try {
        const { categoryId } = req.query;
        const whereClause = categoryId ? { categoryId } : {};
        const products = await Product.findAll({
            where: whereClause,
            include: [Category]
        });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, { include: [Category] });
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET categories
router.get('/categories/all', async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
