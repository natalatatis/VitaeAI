const { Pool } = require('pg');
require('dotenv').config({ path: './conexion.env' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

pool.connect()
  .then(() => console.log('✅ Conexión exitosa a Neon PostgreSQL'))
  .catch(err => console.error('❌ Error de conexión:', err));

module.exports = pool;

