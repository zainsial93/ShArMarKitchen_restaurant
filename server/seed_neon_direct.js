const { Sequelize, DataTypes } = require('sequelize');

// Hardcoded Neon Connection String
const sequelize = new Sequelize('postgresql://neondb_owner:npg_ulZjCO64dsUE@ep-super-sun-ahcb4czh-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require', {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false
});

// Definitions (Simplified for Seeding)
const Category = sequelize.define('Category', {
    name: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING }
});

const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.FLOAT, allowNull: false },
    imageUrl: { type: DataTypes.STRING },
    variants: { type: DataTypes.JSONB }
});

Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

// --- SEEDING LOGIC ---

// Using AI Image Generator for instant results
const getAiUrl = (name) => {
    const prompt = encodeURIComponent(`${name} delicious food professional photo`);
    return `https://image.pollinations.ai/prompt/${prompt}?width=400&height=300&nologo=true&seed=${Math.floor(Math.random() * 1000)}`;
};

const seed = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Connected to Neon! Starting Seed...');

        await sequelize.sync({ force: true });
        console.log('🗑️  Old data cleared. Tables recreated.');

        const categories = [];
        const catNames = ['Burgers', 'Pizzas', 'Karahi', 'Biryani & Rice', 'Desserts', 'Beverages'];

        for (const name of catNames) {
            const cat = await Category.create({ name, image: getAiUrl(name + ' food') });
            categories.push(cat);
            console.log(`Created Category: ${name}`);
        }

        const products = [];

        // Helper to add products
        const add = (catIndex, name, price, variantType) => {
            let variants = null;
            if (variantType === 'pizza') {
                variants = [
                    { label: 'Small', price: price },
                    { label: 'Medium', price: price + 500 },
                    { label: 'Large', price: price + 1000 }
                ];
            } else if (variantType === 'karahi') {
                variants = [
                    { label: 'Half Kg', price: price },
                    { label: 'Full Kg', price: price * 1.8 }
                ];
            }

            products.push({
                name,
                description: `Freshly prepared ${name} with our special ingredients.`,
                price,
                imageUrl: getAiUrl(name), // Generate Image
                categoryId: categories[catIndex].id,
                variants
            });
        };

        // Adding Data
        const burgerList = ['Classic Cheeseburger', 'Bacon Deluxe', 'Smash Burger', 'Zinger Burger', 'Spicy Jalapeno Burger'];
        burgerList.forEach(b => add(0, b, 600));

        const pizzaList = ['Margherita Pizza', 'Pepperoni Pizza', 'BBQ Chicken Pizza', 'Fajita Pizza'];
        pizzaList.forEach(p => add(1, p, 1200, 'pizza'));

        const karahiList = ['Chicken Karahi', 'Mutton Karahi', 'White Handi'];
        karahiList.forEach(k => add(2, k, 1500, 'karahi'));

        const riceList = ['Chicken Biryani', 'Vegetable Rice'];
        riceList.forEach(r => add(3, r, 500));

        const drinkList = ['Coke', 'Pepsi', 'Water', 'Mint Margarita'];
        drinkList.forEach(d => add(5, d, 150));

        // Bulk Insert
        await Product.bulkCreate(products);
        console.log(`✅ successfully added ${products.length} products to Neon!`);

        process.exit();

    } catch (err) {
        console.error('❌ SEED ERROR:', err);
        process.exit(1);
    }
};

seed();
