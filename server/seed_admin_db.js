const sequelize = require('./config/database');
const { User } = require('./models');

const seedAdmin = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected...');

        // Sync to ensure fields exist (especially isAdmin)
        // Alter: true will update the table structure
        await sequelize.sync({ alter: true });

        const adminEmail = 'admin@sialmart.com';
        const adminPass = 'admin123';

        const existingAdmin = await User.findOne({ where: { email: adminEmail } });

        if (existingAdmin) {
            existingAdmin.isAdmin = true;
            existingAdmin.password = adminPass; // Resetting password to ensure access
            await existingAdmin.save();
            console.log('Admin user updated successfully.');
        } else {
            await User.create({
                username: 'Super Admin',
                email: adminEmail,
                password: adminPass,
                isAdmin: true,
                city: 'Headquarters'
            });
            console.log('Admin user created successfully.');
        }

        console.log('Login credentials:');
        console.log(`Email: ${adminEmail}`);
        console.log(`Password: ${adminPass}`);

    } catch (err) {
        console.error('Error seeding admin:', err);
    } finally {
        await sequelize.close();
    }
};

seedAdmin();
