const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Review = sequelize.define('Review', {
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        validate: { min: 1, max: 5 },
        allowNull: true
    },
    feedback: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    suggestions: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

module.exports = Review;
