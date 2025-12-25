const sequelize = require('./config/database');
const { User } = require('./models');

const verify = async () => {
    try {
        await sequelize.authenticate();
        const config = sequelize.config;
        console.log(`Connected to host: ${config.host}`);
        console.log(`Database name: ${config.database}`);

        const users = await User.findAll();
        console.log('Found users:', users.length);
        users.forEach(u => {
            console.log(`- ${u.username} (${u.email}) [Admin: ${u.isAdmin}]`);
        });

    } catch (err) {
        console.error('Error verifying:', err);
    } finally {
        await sequelize.close();
    }
};

verify();
