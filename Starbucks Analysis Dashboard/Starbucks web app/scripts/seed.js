const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'Starbucks',
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false,
});

async function seedCustomers() {
  console.log('--- Seeding Customers ---');
  const filePath = path.join(__dirname, '../Dataset/customers.csv');
  const customers = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        if (row.customer_id) {
          customers.push([
            row.customer_id.trim(),
            row.customer_name?.trim() || null,
            row.customer_email?.trim() || null,
            row.customer_phone?.trim() || null,
            row.customer_age ? parseInt(row.customer_age) : null,
            row.customer_gender?.trim() || null,
          ]);
        }
      })
      .on('end', async () => {
        try {
          console.log(`Parsed ${customers.length} customer records.`);
          for (let i = 0; i < customers.length; i += 100) {
            const batch = customers.slice(i, i + 100);
            const values = [];
            const valueRows = batch.map((c, idx) => {
              const offset = idx * 6;
              values.push(...c);
              return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5}, $${offset + 6})`;
            });

            const query = `
              INSERT INTO customers (customer_id, customer_name, customer_email, customer_phone, customer_age, customer_gender)
              VALUES ${valueRows.join(', ')}
              ON CONFLICT (customer_id) DO NOTHING;
            `;
            await pool.query(query, values);
          }
          console.log('✔ Customers seeded successfully!');
          resolve();
        } catch (err) {
          console.error('❌ Error seeding customers:', err);
          reject(err);
        }
      })
      .on('error', reject);
  });
}

async function seedItems() {
  console.log('--- Seeding Items ---');
  const filePath = path.join(__dirname, '../Dataset/items.csv');
  const items = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        const id = row.ID || row.id;
        if (id) {
          items.push([
            parseInt(id),
            row.item?.trim() || null,
            row.calories ? parseInt(row.calories) : 0,
            row.fat ? parseFloat(row.fat) : 0,
            row.carb ? parseInt(row.carb) : 0,
            row.fiber ? parseInt(row.fiber) : 0,
            row.protein ? parseInt(row.protein) : 0,
            row.type?.trim() || null,
          ]);
        }
      })
      .on('end', async () => {
        try {
          console.log(`Parsed ${items.length} item records.`);
          for (let i = 0; i < items.length; i += 100) {
            const batch = items.slice(i, i + 100);
            const values = [];
            const valueRows = batch.map((item, idx) => {
              const offset = idx * 8;
              values.push(...item);
              return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5}, $${offset + 6}, $${offset + 7}, $${offset + 8})`;
            });

            const query = `
              INSERT INTO items (id, item, calories, fat, carb, fiber, protein, type)
              VALUES ${valueRows.join(', ')}
              ON CONFLICT (id) DO NOTHING;
            `;
            await pool.query(query, values);
          }
          console.log('✔ Items seeded successfully!');
          resolve();
        } catch (err) {
          console.error('❌ Error seeding items:', err);
          reject(err);
        }
      })
      .on('error', reject);
  });
}

async function seedSales() {
  console.log('--- Seeding Sales ---');
  const filePath = path.join(__dirname, '../Dataset/sales.csv');
  const sales = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        if (row.transaction_id) {
          sales.push([
            row.transaction_id.trim(),
            row.store_id ? parseInt(row.store_id) : 101,
            row.datetime ? new Date(row.datetime) : new Date(),
            row.customer_id?.trim() || null,
            row.item_id ? parseInt(row.item_id) : null,
            row.quantity ? parseInt(row.quantity) : 1,
            row.price ? parseFloat(row.price) : 0,
            row.total_amount ? parseFloat(row.total_amount) : 0,
            row.payment_mode?.trim() || 'Cash',
            row.customer_type?.trim() || 'walk-in',
          ]);
        }
      })
      .on('end', async () => {
        try {
          console.log(`Parsed ${sales.length} sales records.`);
          const batchSize = 100;
          for (let i = 0; i < sales.length; i += batchSize) {
            const batch = sales.slice(i, i + batchSize);
            const values = [];
            const valueRows = batch.map((s, idx) => {
              const offset = idx * 10;
              values.push(...s);
              return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5}, $${offset + 6}, $${offset + 7}, $${offset + 8}, $${offset + 9}, $${offset + 10})`;
            });

            const query = `
              INSERT INTO sales (transaction_id, store_id, datetime, customer_id, item_id, quantity, price, total_amount, payment_mode, customer_type)
              VALUES ${valueRows.join(', ')}
              ON CONFLICT (transaction_id) DO NOTHING;
            `;
            await pool.query(query, values);
          }
          console.log('✔ Sales seeded successfully!');
          resolve();
        } catch (err) {
          console.error('❌ Error seeding sales:', err);
          reject(err);
        }
      })
      .on('error', reject);
  });
}

async function runSeed() {
  try {
    await seedCustomers();
    await seedItems();
    await seedSales();
    console.log('🎉 ALL DATASETS SEEDED INTO POSTGRESQL SUCCESSFULLY!');
  } catch (err) {
    console.error('Seed process failed:', err);
  } finally {
    await pool.end();
  }
}

runSeed();
