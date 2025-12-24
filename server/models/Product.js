const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // New: JSON support for variants (Size, Color, etc.)
    // Structure: [{ label: 'Small', price: 10.99 }, { label: 'Medium', price: 14.99 }]
    variants: {
        type: DataTypes.JSON,
        allowNull: true
    }
});

module.exports = Product;
