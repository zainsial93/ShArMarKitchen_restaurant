const express = require('express');
const router = express.Router();
const { Order, OrderItem, Product, User } = require('../models');

// Place Order
router.post('/', async (req, res) => {
    const { customerName, customerAddress, items, totalAmount, userId } = req.body; // userId ignored if valid user check fails

    if (!items || items.length === 0) {
        return res.status(400).json({ error: 'No items in order' });
    }

    try {
        // Create Order first (Parent)
        const order = await Order.create({
            customerName,
            customerAddress,
            totalAmount,
            userId: userId || null,
            status: 'completed'
        });

        // Add Items safely
        for (const item of items) {
            try {
                // Check if product exists to avoid Foreign Key errors (stale cart)
                const productExists = await Product.findByPk(item.productId);
                if (productExists) {
                    await OrderItem.create({
                        orderId: order.id,
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price,
                        variantLabel: item.variantLabel || null
                    });
                } else {
                    console.warn(`Skipping stale product ID: ${item.productId}`);
                }
            } catch (itemErr) {
                console.error(`Failed to add item ${item.productId}:`, itemErr.message);
                // Continue adding other items
            }
        }

        res.status(201).json({ message: 'Order placed successfully', orderId: order.id });
    } catch (err) {
        console.error('Order Creation Failed:', err);
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
