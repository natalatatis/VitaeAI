const express = require("express");
const router = express.Router();
const pool = require("../db");

// Ruta para guardar el texto "Acerca de"
router.post("/", async (req, res) => {
  try {
    const { id_usuario, acercaDe } = req.body;

    console.log("📄 Datos recibidos Step 2:", { id_usuario, acercaDe });

    if (!id_usuario || !acercaDe) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    // Puedes guardar el texto en una tabla temporal o directamente en CvTemporal
    const result = await pool.query(
      `INSERT INTO CvTemporal (id_usuario, acerca_de)
       VALUES ($1, $2)
       ON CONFLICT (id_usuario)
       DO UPDATE SET acerca_de = EXCLUDED.acerca_de
       RETURNING *`,
      [id_usuario, acercaDe]
    );

    res.status(200).json({ message: "Datos de Step 2 guardados correctamente", data: result.rows[0] });
  } catch (error) {
    console.error("❌ Error en Step 2:", error);
    res.status(500).json({ error: "Error al guardar datos del paso 2" });
  }
});

module.exports = router;
