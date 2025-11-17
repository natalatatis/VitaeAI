// backend/routes/cv.js
const express = require("express");
const router = express.Router();
const pool = require("../db");

/* ============================================================
   Convertir fechas tipo "febrero de 2023" → "2023-02-01"
============================================================ */
function parseFecha(fecha) {
  if (!fecha) return null;

  const meses = {
    enero: "01",
    febrero: "02",
    marzo: "03",
    abril: "04",
    mayo: "05",
    junio: "06",
    julio: "07",
    agosto: "08",
    septiembre: "09",
    octubre: "10",
    noviembre: "11",
    diciembre: "12",
  };

  let f = fecha.toLowerCase().trim().replace("de ", "");

  const partes = f.split(" "); // ejemplo: ["febrero","2023"]
  if (partes.length !== 2) return null;

  const [mes, año] = partes;
  if (!meses[mes]) return null;

  return `${año}-${meses[mes]}-01`;
}

/* ============================================================
   CREAR CV (desde TemplateSelector)
============================================================ */
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
      `INSERT INTO curriculum (id_usuario, titulo, plantilla, data, updated_at)
       VALUES ($1, $2, $3, '{}'::jsonb, NOW())
       RETURNING id_cv`,
      [userId, cvTitulo, cvPlantilla]
    );

    const cvId = cvResult.rows[0].id_cv;

    // --------------------------------------------
    // DATOS PERSONALES
    // --------------------------------------------
    if (datosPersonales) {
      await client.query(
        `INSERT INTO datospersonales 
         (telefono, direccion, fecha_nacimiento, nacionalidad, id_cv)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          datosPersonales.telefono || null,
          datosPersonales.direccion || null,
          parseFecha(datosPersonales.fecha_nacimiento),
          datosPersonales.nacionalidad || null,
          cvId,
        ]
      );
    }

    // --------------------------------------------
    // EXPERIENCIA LABORAL
    // --------------------------------------------
    for (const exp of experienciaLaboral || []) {
      await client.query(
        `INSERT INTO experiencialaboral
         (empresa, puesto, fecha_inicio, fecha_fin, descripcion, id_cv)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          exp.empresa || null,
          exp.puesto || null,
          parseFecha(exp.fecha_inicio),
          parseFecha(exp.fecha_fin),
          exp.descripcion || null,
          cvId,
        ]
      );
    }

    // --------------------------------------------
    // EDUCACIÓN
    // --------------------------------------------
    for (const edu of educacion || []) {
      await client.query(
        `INSERT INTO educacion
         (institucion, titulo, fecha_inicio, fecha_fin, id_cv)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          edu.institucion || null,
          edu.titulo || null,
          parseFecha(edu.fecha_inicio),
          parseFecha(edu.fecha_fin),
          cvId,
        ]
      );
    }

    // --------------------------------------------
    // HABILIDADES
    // --------------------------------------------
    for (const hab of habilidades || []) {
      await client.query(
        `INSERT INTO habilidad (nombre, nivel, id_cv)
         VALUES ($1, $2, $3)`,
        [hab.nombre || hab, hab.nivel || null, cvId]
      );
    }

    // --------------------------------------------
    // IDIOMAS
    // --------------------------------------------
    for (const idioma of idiomas || []) {
      await client.query(
        `INSERT INTO idioma (nombre, nivel, id_cv)
         VALUES ($1, $2, $3)`,
        [idioma.nombre || idioma.idioma || "", idioma.nivel || "", cvId]
      );
    }

    await client.query("COMMIT");

    res.json({ ok: true, id_cv: cvId });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Error creando CV:", err);
    res.status(500).json({ error: "Error creando CV" });
  } finally {
    client.release();
  }
});

/* ============================================================
   GET CVs de un usuario
============================================================ */
router.get("/user/:userId", async (req, res) => {
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
    console.error("❌ Error al obtener CVs:", err);
    res.status(500).json({ error: "Error al obtener CVs." });
  }
});

/* ============================================================
   GET detalle CV
============================================================ */
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
    console.error("❌ Error al obtener CV:", err);
    res.status(500).json({ error: "Error al obtener CV." });
  }
});

/* ============================================================
   SAVE CV simple
============================================================ */
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

/* ============================================================
   UPDATE CV
============================================================ */
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

/* ============================================================
   DELETE CV
============================================================ */
router.delete("/cv/:id", async (req, res) => {
  try {
    await pool.query(`DELETE FROM curriculum WHERE id_cv = $1`, [
      req.params.id,
    ]);
    res.json({ ok: true });
  } catch (err) {
    console.error("❌ Error al eliminar CV:", err);
    res.status(500).json({ error: "Error al eliminar CV." });
  }
});

module.exports = router;
