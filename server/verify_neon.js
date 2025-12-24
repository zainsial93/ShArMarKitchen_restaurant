const { Sequelize } = require('sequelize');

// Neon Connection String
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

async function checkData() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connected to Neon Database!');

        const [results] = await sequelize.query("SELECT count(*) FROM \"Products\"");
        console.log(`🍔 Total Products in Neon: ${results[0].count}`);

        const [catResults] = await sequelize.query("SELECT count(*) FROM \"Categories\"");
        console.log(`📂 Total Categories in Neon: ${catResults[0].count}`);

        const [products] = await sequelize.query("SELECT name, price FROM \"Products\" LIMIT 3");
        console.log('👀 Sample Products:', products);

    } catch (error) {
        console.error('❌ Connection Failed:', error);
    } finally {
        await sequelize.close();
    }
}

checkData();
