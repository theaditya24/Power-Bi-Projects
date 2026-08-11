import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'Postgres@123',
  database: process.env.DB_NAME || 'Starbucks',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

export async function query(text: string, params?: any[]) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    // Log slow queries (> 500ms) in development
    if (duration > 500) {
      console.log(`[DB Query] executed in ${duration}ms: ${text.slice(0, 80)}`);
    }
    return res;
  } catch (error) {
    console.error('[DB Query Error]:', error);
    throw error;
  }
}

export default pool;
