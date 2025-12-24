const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: false
    })
    : new Sequelize(
        process.env.DB_NAME || 'ecommerce_db',
        process.env.DB_USER || 'postgres',
        process.env.DB_PASSWORD || 'umar',
        {
            host: process.env.DB_HOST || 'localhost',
            dialect: 'postgres',
            logging: false,
        }
    );

module.exports = sequelize;
