const { sequelize, Category, Product, User } = require('./models');

// NOTE TO USER:
// 1. Place your images in 'client/public/images/products/'
// 2. Name them exactly like the product name but with underscores, e.g., "zinger_burger.jpg"

const getLocalImg = (name, type = 'products') => {
    const filename = name.toLowerCase().replace(/ /g, '_') + '.jpg';
    return `/images/${type}/${filename}`;
};

const getAiUrl = (name) => {
    const prompt = encodeURIComponent(`${name} food professional photography`);
    return `https://image.pollinations.ai/prompt/${prompt}?width=400&height=300&nologo=true&seed=${Math.floor(Math.random() * 100)}`;
};

const seed = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Seeding ShArMar Kitchen database...');

        const categories = [];
        const catNames = [
            'Burgers', 'Pizzas', 'Karahi', 'Biryani & Rice', 'Desserts', 'Beverages'
        ];

        for (const name of catNames) {
            const cat = await Category.create({
                name,
                image: getAiUrl(name) // Using AI for category thumbnails for now, or local if you have them
            });
            categories.push(cat);
            console.log(`Created Category: ${name}`);
        }

        const products = [];

        // Helper Function
        const add = (catIndex, name, price, variantType, customImg = null) => {
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

            // Use local image path logic by default as requested previously, or AI fallback if desired.
            // User said "I already have images... place them myself". So I will stick to local paths.
            // But if they haven't placed them yet, it will be blank.
            // To be safe and show *something* nice immediately (since it's a demo), I will use the AI URL for now 
            // but leave the local path logic commented or secondary.
            // actually, user asked "How can I add them to this?", implies they want to use their images.
            // I will revert to local path preference.

            products.push({
                name,
                description: `Delicious ${name} prepared fresh for you.`,
                price,
                imageUrl: getLocalImg(name), // Expects /images/products/name.jpg
                categoryId: categories[catIndex].id,
                variants
            });
        };

        // 1. BURGERS
        const burgerList = [
            'Classic Cheeseburger', 'Bacon Deluxe Burger', 'Double Beef Smash Burger', 'BBQ Ranch Burger',
            'Mushroom Swiss Burger', 'Spicy Jalapeño Burger', 'Crispy Chicken Burger', 'Grilled Chicken Avocado Burger',
            'Veggie Garden Burger', 'Black Bean Burger', 'Hawaiian Teriyaki Burger', 'Blue Cheese Burger',
            'Pepper Jack Burger', 'Buffalo Chicken Burger', 'Loaded Nacho Burger', 'Smoky Chipotle Burger',
            'Garlic Butter Burger', 'Fried Egg Breakfast Burger', 'Truffle Beef Burger', 'Zinger Chicken Burger'
        ];
        burgerList.forEach(b => add(0, b, 600));

        // 2. PIZZAS
        const pizzaList = [
            'Margherita Pizza', 'Pepperoni Pizza', 'BBQ Chicken Pizza', 'Hawaiian Pizza', 'Veggie Supreme Pizza',
            'Meat Lovers Pizza', 'Four Cheese Pizza', 'Chicken Tikka Pizza', 'Mushroom & Olive Pizza', 'Spicy Beef Pizza'
        ];
        pizzaList.forEach(p => add(1, p, 1200, 'pizza'));

        // 3. KARAHI
        const karahiList = [
            'Chicken Karahi', 'Mutton Karahi', 'White Karahi', 'Peshawari Karahi', 'Shinwari Karahi',
            'Boneless Chicken Karahi', 'Chicken Achari Karahi', 'Chicken Green Karahi', 'Chicken Ginger Karahi', 'Special Lahori Karahi'
        ];
        karahiList.forEach(k => add(2, k, 1800, 'karahi'));

        // 4. BIRYANI
        const riceList = ['Chicken Biryani', 'Beef Biryani', 'Mutton Biryani', 'Sindhi Biryani', 'Vegetable Biryani', 'Chicken Fried Rice'];
        riceList.forEach(r => add(3, r, 500));

        // 5. DESSERTS
        const dessertList = [
            'Chocolate Lava Cake', 'Vanilla Ice Cream', 'Strawberry Cheesecake', 'Gulab Jamun', 'Kheer',
            'Ras Malai', 'Caramel Custard', 'Brownies', 'Apple Pie', 'Donuts', 'Chocolate Mousse',
            'Fruit Trifle', 'Ice Cream Sundae', 'Tiramisu', 'Shahi Tukray', 'Kulfi', 'Cupcakes',
            'Pancakes with Syrup', 'Waffles', 'Chocolate Fudge Cake', 'Rabri'
        ];
        dessertList.forEach(d => add(4, d, 350));

        // 6. BEVERAGES
        const drinkList = [
            'Coca Cola', 'Pepsi', 'Sprite', 'Fanta', 'Mineral Water', 'Fresh Lime Soda', 'Mint Lemonade',
            'Mango Juice', 'Orange Juice', 'Apple Juice', 'Strawberry Shake', 'Chocolate Shake', 'Vanilla Shake',
            'Cold Coffee', 'Iced Tea', 'Green Tea', 'Cappuccino', 'Latte', 'Espresso', 'Hot Chocolate', 'Masala Chai'
        ];
        drinkList.forEach(d => add(5, d, 150));

        // Batch Insert
        const chunkSize = 50;
        for (let i = 0; i < products.length; i += chunkSize) {
            await Product.bulkCreate(products.slice(i, i + chunkSize));
            console.log(`Seeded batch ${i} - ${i + chunkSize}`);
        }

        // Create Admin User
        const adminEmail = 'sadhanaadmin@example.com';
        const adminPass = 'umararwa19';
        const adminUser = await User.create({
            username: 'Sadhana Admin',
            email: adminEmail,
            password: adminPass,
            isAdmin: true,
            city: 'Headquarters'
        });
        console.log(`✅ Admin User Created: ${adminEmail}`);

        console.log('ShArMar Kitchen Seed Complete!');
        process.exit();

    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

seed();
