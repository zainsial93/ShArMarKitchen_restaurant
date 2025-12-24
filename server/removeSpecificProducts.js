const { sequelize, Product } = require('./models');

const productsToRemove = [
    "Hawaiian Teriyaki Burger",
    "Rabri",
    "Coca Cola",
    "Pepsi",
    "Sprite",
    "Fanta",
    "Mineral Water"
];

const run = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        const deletedCount = await Product.destroy({
            where: {
                name: productsToRemove
            }
        });

        console.log(`Successfully deleted ${deletedCount} products.`);
        console.log('Deleted products:', productsToRemove.join(', '));

        process.exit(0);
    } catch (error) {
        console.error('Error deleting products:', error);
        process.exit(1);
    }
};

run();
