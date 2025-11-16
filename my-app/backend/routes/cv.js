const express = require("express");
const router = express.Router();
const pool = require("../db");

// ========================================================================
// CREAR CV COMPLETO
// ========================================================================
router.post("/generar-cv", async (req, res) => {
  const {
    userId,
    cvTitulo,
    cvPlantilla,
    datosPersonales,
    experienciaLaboral,
    educacion,
    habilidades,
    idiomas,
  } = req.body;

  if (!userId || !cvTitulo || !cvPlantilla)
    return res.status(400).json({ error: "Faltan datos requeridos." });

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const cvResult = await client.query(
      `INSERT INTO curriculum (id_usuario, titulo, plantilla, data)
       VALUES ($1, $2, $3, '{}'::jsonb)
       RETURNING id_cv`,
      [userId, cvTitulo, cvPlantilla]
    );

    const cvId = cvResult.rows[0].id_cv;

    if (datosPersonales) {
      await client.query(
        `INSERT INTO datospersonales 
         (telefono, direccion, fecha_nacimiento, nacionalidad, id_cv)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          datosPersonales.telefono || null,
          datosPersonales.direccion || null,
          datosPersonales.fecha_nacimiento || null,
          datosPersonales.nacionalidad || null,
          cvId,
        ]
      );
    }

    for (const exp of experienciaLaboral || []) {
      await client.query(
        `INSERT INTO experiencialaboral
         (empresa, puesto, fecha_inicio, fecha_fin, descripcion, id_cv)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          exp.empresa,
          exp.puesto,
          exp.fecha_inicio || null,
          exp.fecha_fin || null,
          exp.descripcion,
          cvId,
        ]
      );
    }

    for (const edu of educacion || []) {
      await client.query(
        `INSERT INTO educacion
         (institucion, titulo, fecha_inicio, fecha_fin, id_cv)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          edu.institucion,
          edu.titulo,
          edu.fecha_inicio || null,
          edu.fecha_fin || null,
          cvId,
        ]
      );
    }

    for (const hab of habilidades || []) {
      await client.query(
        `INSERT INTO habilidad (nombre, nivel, id_cv)
         VALUES ($1, $2, $3)`,
        [hab.nombre, hab.nivel, cvId]
      );
    }

    for (const idioma of idiomas || []) {
      await client.query(
        `INSERT INTO idioma (nombre, nivel, id_cv)
         VALUES ($1, $2, $3)`,
        [idioma.nombre, idioma.nivel, cvId]
      );
    }

    await client.query("COMMIT");

    res.json({
      ok: true,
      id_cv: cvId,
    });

  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Error creando CV:", err);
    res.status(500).json({ error: "Error creando CV" });
  } finally {
    client.release();
  }
});

// ========================================================================
// GET CVs de un usuario
// ========================================================================
router.get("/:userId", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id_cv AS id, titulo AS title, plantilla AS template, data, updated_at
       FROM curriculum
       WHERE id_usuario = $1
       ORDER BY updated_at DESC`,
      [req.params.userId]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener CVs." });
  }
});

// ========================================================================
// GET detalle CV
// ========================================================================
router.get("/detalle/:id", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id_cv AS id, titulo AS title, plantilla AS template, data, updated_at
       FROM curriculum
       WHERE id_cv = $1`,
      [req.params.id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: "CV no encontrado." });

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener CV." });
  }
});

// ========================================================================
// SAVE SIMPLE CV (from preview)
// ========================================================================
router.post("/cv", async (req, res) => {
  try {
    const { userId, title, template, data } = req.body;

    if (!userId || !title || !template || !data) {
      return res.status(400).json({ error: "Faltan campos requeridos." });
    }

    const result = await pool.query(
      `INSERT INTO curriculum (id_usuario, titulo, plantilla, data, updated_at)
       VALUES ($1, $2, $3, $4, NOW())
       RETURNING id_cv AS id`,
      [userId, title, template, data]
    );

    res.json({ ok: true, id_cv: result.rows[0].id });
  } catch (err) {
    console.error("❌ Error guardando CV:", err);
    res.status(500).json({ error: "Error guardando CV" });
  }
});


// ========================================================================
// UPDATE CV (from preview)
// ========================================================================
router.put("/cv/:id", async (req, res) => {
  try {
    const { title, template, data } = req.body;

    const result = await pool.query(
      `UPDATE curriculum
       SET titulo = $1, plantilla = $2, data = $3, updated_at = NOW()
       WHERE id_cv = $4
       RETURNING id_cv`,
      [title, template, data, req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "CV no encontrado" });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error("❌ Error actualizando CV:", err);
    res.status(500).json({ error: "Error actualizando CV" });
  }
});



// ========================================================================
// DELETE CV
// ========================================================================
router.delete("/:id", async (req, res) => {
  try {
    await pool.query(`DELETE FROM curriculum WHERE id_cv = $1`, [
      req.params.id,
    ]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar CV." });
  }
});

module.exports = router;
