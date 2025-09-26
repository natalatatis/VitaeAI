const pool = require('./db');

async function test() {
  try {
    const res = await pool.query('SELECT * FROM "Usuario"');
    console.log('✅ Datos de Usuario:', res.rows);
  } catch (err) {
    console.error('❌ Error al obtener usuarios:', err);
  } finally {
    pool.end();
  }
}

test();
