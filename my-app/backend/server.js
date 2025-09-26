require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');   
const app = express();
app.use(cors());
app.use(express.json());

//GET usuarios
app.get('/usuarios', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuario');
        res.json(result.rows);
    }catch(err){
        console.error(err);
        res.status(500).json({error: "Error al obtener usuario"});
    }
});

//POST usuarios
app.post('/usuarios', async (req, res) => {
  const { nombre, apellido, correo, password } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO usuario (nombre, apellido, correo, contrasenia)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [nombre, apellido, correo, password]
    );

    res.status(201).json(result.rows[0]); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


//Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});