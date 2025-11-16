const pool = require('./db');

(async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('🕐 Fecha actual del servidor:', result.rows[0]);
    process.exit(0);
  } catch (err) {
    console.error('Error ejecutando prueba:', err);
    process.exit(1);
  }
})();
