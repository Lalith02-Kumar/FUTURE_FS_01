const mysql = require('mysql2');
require('dotenv').config();

const isRemoteDB = process.env.DB_HOST && process.env.DB_HOST !== 'localhost' && process.env.DB_HOST !== '127.0.0.1';
const connectionConfig = process.env.DATABASE_URL || {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'lalith_portfolio',
  ssl: isRemoteDB ? { rejectUnauthorized: false } : undefined,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(connectionConfig);

// Basic connection test with detailed logging
console.log(`📡 Attempting to connect to database at ${connectionConfig.host || 'unknown host'} as user ${connectionConfig.user || 'unknown user'}...`);

pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed!');
    console.error('Error Code:', err.code);
    console.error('Error Message:', err.message);
    if (err.stack) console.error('Stack Trace:', err.stack);
  } else {
    console.log('✅ Database connected successfully!');
    connection.release();
  }
});

module.exports = pool.promise();
