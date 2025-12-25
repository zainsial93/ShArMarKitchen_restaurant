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
                // Pizza: Small 300-500, Medium 500-800, Large 900-1300
                // We passed base price ~400 (Small)
                variants = [
                    { label: 'Small', price: price },
                    { label: 'Medium', price: price + 250 }, // 400+250 = 650 (fits 500-800)
                    { label: 'Large', price: price + 700 }   // 400+700 = 1100 (fits 900-1300)
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
        // Burgers: 200-700. Use 450 avg.
        burgerList.forEach(b => add(0, b, 450));

        const pizzaList = ['Margherita Pizza', 'Pepperoni Pizza', 'BBQ Chicken Pizza', 'Fajita Pizza'];
        // Pizza: Small 300-500. Use 400.
        // Logic in 'add' function for Pizza variants needs to be calculated relative to this or fixed.
        // Current 'add' logic: S=price, M=price+500, L=price+1000.
        // If Base=400: S=400, M=900 (High but ok?), L=1400 (High).
        // Requested: M(500-800), L(900-1300).
        // Let's modify the 'add' function logic locally or just pass base. 
        // I will update the 'add' function above instead.
        pizzaList.forEach(p => add(1, p, 400, 'pizza'));

        const karahiList = ['Chicken Karahi', 'Mutton Karahi', 'White Handi'];
        // Karahi: 900-1900. Use 1200.
        karahiList.forEach(k => add(2, k, 1200, 'karahi'));

        const riceList = ['Chicken Biryani', 'Vegetable Rice'];
        // Biryani: 150-450. Use 300.
        riceList.forEach(r => add(3, r, 300));

        // Desserts were missing in original call list? Add them.
        const dessertList = ['Chocolate Cake', 'Ice Cream', 'Brownie'];
        // Desserts: 100-500. Use 250.
        dessertList.forEach(d => add(4, d, 250));

        const drinkList = ['Coke', 'Pepsi', 'Water', 'Mint Margarita'];
        // Beverages: 150-600. Use 200.
        drinkList.forEach(d => add(5, d, 200));

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
