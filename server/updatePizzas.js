const { sequelize, Product, Category } = require('./models');

const newPizzas = [
    { name: "Chicken Tikka Pizza", description: "Spicy chicken tikka with onions and capsicum" },
    { name: "Chicken Fajita Pizza", description: "Fajita-seasoned chicken with peppers" },
    { name: "BBQ Chicken Pizza", description: "Sweet and smoky barbecue flavor" },
    { name: "Chicken Supreme Pizza", description: "Chicken with mushrooms, olives, and veggies" },
    { name: "Malai Boti Pizza", description: "Creamy, mildly spicy malai chicken" },
    { name: "Pepperoni Pizza", description: "Popular in major pizza chains" },
    { name: "Cheese Lovers Pizza", description: "Extra mozzarella and cheese blends" },
    { name: "Afghani Tikka Pizza", description: "Mild, creamy Afghani-style chicken" },
    { name: "Veggie Lover Pizza", description: "Olives, jalapeños, mushrooms, onions" },
    { name: "Crown Crust Pizza", description: "Stuffed crust pizza popularized by Pakistani chains" }
];

const run = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        // Find the 'Pizzas' category
        const pizzaCategory = await Category.findOne({ where: { name: 'Pizzas' } });

        if (!pizzaCategory) {
            console.error('Category "Pizzas" not found!');
            process.exit(1);
        }

        const categoryId = pizzaCategory.id;
        console.log(`Found "Pizzas" category with ID: ${categoryId}`);

        // Delete existing products in this category
        const deletedCount = await Product.destroy({ where: { categoryId } });
        console.log(`Deleted ${deletedCount} existing pizza products.`);

        // Prepare new products
        const productsToCreate = newPizzas.map(p => ({
            name: p.name,
            description: p.description,
            price: 1200, // Default price
            imageUrl: `/images/products/${p.name.toLowerCase().replace(/ /g, '_')}.jpg`,
            categoryId,
            variants: [
                { label: "Small", price: 1200 },
                { label: "Medium", price: 1700 },
                { label: "Large", price: 2200 }
            ]
        }));

        // Bulk create new products
        await Product.bulkCreate(productsToCreate);
        console.log(`Added ${productsToCreate.length} new pizza products.`);

        process.exit(0);
    } catch (error) {
        console.error('Error updating pizzas:', error);
        process.exit(1);
    }
};

run();
