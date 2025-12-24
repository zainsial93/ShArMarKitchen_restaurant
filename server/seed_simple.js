const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgresql://neondb_owner:npg_ulZjCO64dsUE@ep-super-sun-ahcb4czh-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require',
    ssl: { rejectUnauthorized: false }
});

async function main() {
    try {
        console.log("Connecting...");
        await client.connect();
        console.log("Connected! Creating tables...");

        // Create Tables
        await client.query(`
            CREATE TABLE IF NOT EXISTS "Categories" (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image VARCHAR(255),
                "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS "Products" (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                price FLOAT NOT NULL,
                "imageUrl" VARCHAR(255),
                "categoryId" INTEGER REFERENCES "Categories"(id),
                variants JSONB,
                "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log("Tables Ready. Inserting Data...");

        // Insert Categories
        const cats = ['Burgers', 'Pizzas', 'Beverages'];
        for (const c of cats) {
            const res = await client.query(
                'INSERT INTO "Categories" (name, "createdAt", "updatedAt") VALUES ($1, NOW(), NOW()) RETURNING id',
                [c]
            );
            const catId = res.rows[0].id;

            // Insert Product for this category
            await client.query(
                'INSERT INTO "Products" (name, price, "categoryId", "createdAt", "updatedAt") VALUES ($1, $2, $3, NOW(), NOW())',
                [`Test ${c}`, 500, catId]
            );
            console.log(`Added Test ${c}`);
        }

        console.log("DONE! Check Neon now.");

    } catch (e) {
        console.error("ERROR:", e);
    } finally {
        await client.end();
    }
}

main();
