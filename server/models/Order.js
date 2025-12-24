const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
    customerName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    customerAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
        defaultValue: 'pending'
    }
});

module.exports = Order;
