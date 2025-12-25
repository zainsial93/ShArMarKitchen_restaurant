const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const reviewRoutes = require('./routes/reviews');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: '*', // Allow all origins (safest for now to fix connection issues)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-token']
}));
app.use(bodyParser.json());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Health check route
app.get('/', (req, res) => {
    res.send('API is running');
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', require('./routes/admin'));
app.use('/api/auth', require('./routes/auth'));

// Export the app for Vercel/Serverless
module.exports = app;

const { User } = require('./models');

// Only start the server if running locally or in a standard node environment
if (require.main === module) {
    sequelize.sync({ force: false, alter: true }).then(async () => {
        console.log('Database synced');

        // Ensure Admin Exists
        try {
            const adminEmail = 'sadhanaadmin@example.com';
            const adminPass = 'umararwa19';

            const existingAdmin = await User.findOne({ where: { email: adminEmail } });

            if (existingAdmin) {
                // Ensure they are admin and password is correct (if different)
                if (!existingAdmin.isAdmin || existingAdmin.password !== adminPass) {
                    existingAdmin.isAdmin = true;
                    existingAdmin.password = adminPass;
                    await existingAdmin.save();
                    console.log('Admin user credentials updated.');
                }
            } else {
                await User.create({
                    username: 'Sadhana Admin',
                    email: adminEmail,
                    password: adminPass,
                    isAdmin: true,
                    city: 'Headquarters'
                });
                console.log('Admin user created.');
            }
        } catch (e) {
            console.error('Admin check failed:', e);
        }

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }).catch(err => {
        console.error('Database connection failed:', err);
    });
}
