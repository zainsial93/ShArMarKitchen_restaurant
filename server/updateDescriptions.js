const { sequelize, Product } = require('./models');

const updates = {
    "Classic Cheeseburger": "Juicy beef patty with melted cheese, lettuce, tomato, and sauce on a soft bun.",
    "Bacon Deluxe Burger": "Beef patty topped with crispy bacon, cheese, lettuce, and tomato.",
    "Double Beef Smash Burger": "Two smashed beef patties with cheese, pickles, and special sauce.",
    "BBQ Ranch Burger": "Beef patty with BBQ sauce, ranch dressing, cheese, and onions.",
    "Mushroom Swiss Burger": "Beef patty with sautéed mushrooms and Swiss cheese.",
    "Spicy Jalapeño Burger": "Beef patty with spicy jalapeños, cheese, and chili sauce.",
    "Crispy Chicken Burger": "Fried crispy chicken fillet with lettuce, tomato, and mayo.",
    "Grilled Chicken Avocado Burger": "Grilled chicken breast topped with fresh avocado and cheese.",
    "Veggie Garden Burger": "Mixed vegetable patty with lettuce, tomato, and sauce.",
    "Black Bean Burger": "Spiced black bean patty served with fresh vegetables.",
    "Hawaiian Teriyaki Burger": "Beef or chicken patty with pineapple, teriyaki sauce, and cheese.",
    "Blue Cheese Burger": "Beef patty with tangy blue cheese and fresh greens.",
    "Pepper Jack Burger": "Beef patty with spicy pepper jack cheese and jalapeños.",
    "Buffalo Chicken Burger": "Fried chicken tossed in spicy buffalo sauce with lettuce and ranch.",
    "Loaded Nacho Burger": "Beef patty topped with nacho chips, cheese, jalapeños, and salsa.",
    "Smoky Chipotle Burger": "Beef patty with smoky chipotle sauce, cheese, and onions.",
    "Garlic Butter Burger": "Juicy beef patty flavored with garlic butter and herbs.",
    "Fried Egg Breakfast Burger": "Beef patty topped with a fried egg, bacon, and cheese.",
    "Truffle Beef Burger": "Gourmet beef patty with truffle-infused sauce and cheese.",
    "Zinger Chicken Burger": "Spicy fried chicken fillet with lettuce, mayo, and pickles.",
    "Margherita Pizza": "Classic pizza with tomato sauce, mozzarella, and basil.",
    "Pepperoni Pizza": "Pizza topped with spicy pepperoni slices and mozzarella.",
    "BBQ Chicken Pizza": "Grilled chicken with BBQ sauce, onions, and cheese.",
    "Hawaiian Pizza": "Ham and pineapple on a cheesy tomato base.",
    "Veggie Supreme Pizza": "Loaded with peppers, onions, mushrooms, and olives.",
    "Meat Lovers Pizza": "Topped with chicken, beef, and pepperoni.",
    "Four Cheese Pizza": "Mozzarella, cheddar, parmesan, and gouda cheese blend.",
    "Chicken Tikka Pizza": "Spicy chicken tikka with onions, peppers, and cheese.",
    "Mushroom & Olive Pizza": "Mushrooms, black olives, and mozzarella cheese.",
    "Spicy Beef Pizza": "Minced beef with chili, onions, and cheese.",
    "Chicken Karahi": "Chicken cooked in spicy tomato-based gravy.",
    "Mutton Karahi": "Tender mutton pieces in rich, flavorful gravy.",
    "White Karahi": "Chicken in a creamy white sauce with mild spices.",
    "Peshawari Karahi": "Traditional Peshawar-style spicy chicken karahi.",
    "Shinwari Karahi": "Extra-spicy mutton cooked with special spices.",
    "Boneless Chicken Karahi": "Boneless chicken in classic karahi gravy.",
    "Chicken Achari Karahi": "Chicken cooked with tangy pickling spices.",
    "Chicken Green Karahi": "Chicken in green herbs and spices gravy.",
    "Chicken Ginger Karahi": "Chicken with aromatic ginger-flavored gravy.",
    "Special Lahori Karahi": "Richly spiced Lahori-style chicken karahi.",
    "Chicken Biryani": "Spiced basmati rice with tender chicken pieces.",
    "Beef Biryani": "Aromatic rice with slow-cooked beef and spices.",
    "Mutton Biryani": "Flavorful rice with tender mutton and rich spices.",
    "Sindhi Biryani": "Spicy biryani with yogurt, potatoes, and meat.",
    "Vegetable Biryani": "Basmati rice cooked with mixed vegetables and spices.",
    "Chicken Fried Rice": "Stir-fried rice with chicken, vegetables, and soy sauce.",
    "Chocolate Lava Cake": "Warm chocolate cake with molten center.",
    "Vanilla Ice Cream": "Creamy vanilla-flavored ice cream.",
    "Strawberry Cheesecake": "Creamy cheesecake topped with strawberry sauce.",
    "Gulab Jamun": "Deep-fried milk balls soaked in sugar syrup.",
    "Kheer": "Sweet rice pudding with milk and cardamom.",
    "Ras Malai": "Soft cheese balls in sweetened milk.",
    "Caramel Custard": "Smooth custard topped with caramel syrup.",
    "Brownies": "Rich, chocolatey baked squares.",
    "Apple Pie": "Sweet baked pastry filled with spiced apples.",
    "Donuts": "Soft fried dough coated with sugar or glaze.",
    "Chocolate Mousse": "Light and creamy chocolate dessert.",
    "Fruit Trifle": "Layers of sponge, custard, fruit, and cream.",
    "Ice Cream Sundae": "Ice cream with syrup, nuts, and toppings.",
    "Tiramisu": "Coffee-flavored Italian dessert with mascarpone cream.",
    "Shahi Tukray": "Fried bread in sweetened milk and nuts.",
    "Kulfi": "Traditional dense ice cream.",
    "Cupcakes": "Small, frosted individual cakes.",
    "Pancakes with Syrup": "Fluffy pancakes served with syrup.",
    "Waffles": "Crispy-on-the-outside, soft-on-the-inside waffles.",
    "Chocolate Fudge Cake": "Rich chocolate cake with fudge frosting.",
    "Rabri": "Thick, sweetened milk dessert garnished with nuts.",
    "Coca Cola": "Classic fizzy cola drink.",
    "Pepsi": "Popular carbonated cola drink.",
    "Sprite": "Lemon-lime flavored soft drink.",
    "Fanta": "Orange-flavored carbonated drink.",
    "Mineral Water": "Bottled purified water.",
    "Fresh Lime Soda": "Refreshing lime-flavored soda.",
    "Mint Lemonade": "Lemonade with fresh mint leaves.",
    "Mango Juice": "Sweet mango-flavored juice.",
    "Orange Juice": "Freshly squeezed orange juice.",
    "Apple Juice": "Sweet apple-flavored juice.",
    "Strawberry Shake": "Delicious Strawberry Shake prepared fresh for you.",
    "Chocolate Shake": "Delicious Chocolate Shake prepared fresh for you.",
    "Vanilla Shake": "Delicious Vanilla Shake prepared fresh for you.",
    "Cold Coffee": "Delicious Cold Coffee prepared fresh for you.",
    "Iced Tea": "Delicious Iced Tea prepared fresh for you.",
    "Green Tea": "Delicious Green Tea prepared fresh for you.",
    "Cappuccino": "Delicious Cappuccino prepared fresh for you.",
    "Latte": "Delicious Latte prepared fresh for you.",
    "Espresso": "Delicious Espresso prepared fresh for you.",
    "Hot Chocolate": "Delicious Hot Chocolate prepared fresh for you.",
    "Masala Chai": "Delicious Masala Chai prepared fresh for you."
};

const run = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        for (const [name, description] of Object.entries(updates)) {
            const product = await Product.findOne({ where: { name } });
            if (product) {
                product.description = description;
                await product.save();
                console.log(`Updated: ${name}`);
            } else {
                console.log(`Product not found: ${name}`);
            }
        }

        console.log('All updates complete.');
        process.exit(0);
    } catch (error) {
        console.error('Error updating products:', error);
        process.exit(1);
    }
};

run();
