const express = require('express');
const router = express.Router();
const { Order, OrderItem, Product, User } = require('../models');

// Place Order
router.post('/', async (req, res) => {
    const { customerName, customerAddress, items, totalAmount, userId } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ error: 'No items in order' });
    }

    try {
        const order = await Order.create({
            customerName,
            customerAddress,
            totalAmount,
            userId: userId || null, // Guest checkout support
            status: 'completed'
        });

        for (const item of items) {
            await OrderItem.create({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
                variantLabel: item.variantLabel || null // Save the variant info
            });
        }

        res.status(201).json({ message: 'Order placed successfully', orderId: order.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Get Orders
router.get('/:userId', async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.params.userId },
            include: [OrderItem]
        });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
