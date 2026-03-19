```javascript
/**
 * Database configuration file.
 * 
 * This file defines the configuration for the database connection.
 * 
 * @module config/database
 */

const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

/**
 * Creates a new database pool.
 * 
 * @returns {Pool} A new database pool.
 */
function createPool() {
    try {
        const pool = new Pool({
            user: process.env.SUPABASE_URL.split('@')[0].split(':')[1],
            host: process.env.SUPABASE_URL.split('@')[1].split(':')[0],
            database: process.env.SUPABASE_URL.split('@')[1].split(':')[1].split('/')[1],
            password: process.env.SUPABASE_KEY,
            port: 5432,
        });

        return pool;
    } catch (error) {
        throw new Error(`Failed to create database pool: ${error.message}`);
    }
}

/**
 * Closes the database pool.
 * 
 * @param {Pool} pool The database pool to close.
 */
function closePool(pool) {
    try {
        pool.end();
    } catch (error) {
        throw new Error(`Failed to close database pool: ${error.message}`);
    }
}

/**
 * Executes a query on the database.
 * 
 * @param {Pool} pool The database pool to use.
 * @param {string} query The query to execute.
 * @param {array} params The query parameters.
 * @returns {Promise<object>} The query result.
 */
async function executeQuery(pool, query, params) {
    try {
        const result = await pool.query(query, params);
        return result;
    } catch (error) {
        throw new Error(`Failed to execute query: ${error.message}`);
    }
}

module.exports = {
    createPool,
    closePool,
    executeQuery,
};
```