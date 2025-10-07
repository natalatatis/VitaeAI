require('dotenv').config();
const express = require('express');
const cors = require('cors');
const argon2 = require('argon2');
const pool = require('./db');
const app = express();

app.use(cors());
app.use(express.json());


// GET todos los usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT id_usuario, nombre, apellido, correo FROM usuario');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});


// POST crear usuario
app.post('/usuarios', async (req, res) => {
  const { nombre, apellido, correo, contrasenia } = req.body;

  if (!nombre || !apellido || !correo || !contrasenia) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    // Hashear la contraseña antes de guardar
    const password_hash = await argon2.hash(contrasenia);

    const result = await pool.query(
      `INSERT INTO usuario (nombre, apellido, correo, password_hash)
       VALUES ($1, $2, $3, $4) RETURNING id_usuario, nombre, apellido, correo`,
      [nombre, apellido, correo, password_hash]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    // Manejar errores de correo duplicado
    if (err.code === '23505') {
      res.status(400).json({ error: 'El correo ya está registrado' });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});


// POST login
app.post('/login', async (req, res) => {
  const { correo, contrasenia } = req.body;

  if (!correo || !contrasenia) {
    return res.status(400).json({ error: 'Correo y contraseña son requeridos' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM usuario WHERE correo = $1',
      [correo]
    );

    const user = result.rows[0];
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    // Verificar contraseña con hash
    const valid = await argon2.verify(user.password_hash, contrasenia);
    if (!valid) return res.status(401).json({ error: 'Correo o contraseña incorrectos' });

    // No devolver hash
    const responseUser = {
      id_usuario: user.id_usuario,
      nombre: user.nombre,
      apellido: user.apellido,
      correo: user.correo
    };

    res.json({ ok: true, usuario: responseUser });
  } catch (err) {
    console.error("ERROR EN LOGIN:", err);
    res.status(500).json({ ok: false, message: "Error del servidor" });
  }
});


// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
