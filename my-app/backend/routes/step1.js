const express = require("express");
const router = express.Router();
const pool = require("../db");

// POST /step1
router.post("/", async (req, res) => {
  try {
    const { id_usuario, telefono, direccion, nacionalidad } = req.body;

    if (!id_usuario || !telefono || !direccion || !nacionalidad) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    const result = await pool.query(
      `INSERT INTO DatosPersonales (telefono, direccion, nacionalidad, id_usuario)
       VALUES ($1, $2, $3, $4)
       RETURNING id_datos, telefono, direccion, nacionalidad, id_usuario`,
      [telefono, direccion, nacionalidad, id_usuario]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error en /step1:", error);
    res.status(500).json({ error: "Error al guardar Step 1" });
  }
});

module.exports = router;
