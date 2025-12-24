const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrderItem = sequelize.define('OrderItem', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    // New: Store which variant was chosen (e.g., "Small", "Red")
    variantLabel: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = OrderItem;
