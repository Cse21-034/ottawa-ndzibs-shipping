import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

// Get database URL from environment variables
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

// Create the connection
const sql = neon(DATABASE_URL);
export const db = drizzle(sql, { schema });

// Initialize database (run migrations, seed data, etc.)
export async function initializeDatabase() {
  try {
    // Test the connection
    await sql`SELECT 1`;
    console.log('Database connection established');
    
    // You can add migration logic here if needed
    // await migrate(db, { migrationsFolder: './migrations' });
    
    return db;
  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw error;
  }
}
