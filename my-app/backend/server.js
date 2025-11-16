require("dotenv").config();
const express = require("express");
const cors = require("cors");
const argon2 = require("argon2");
const pool = require("./db");
const app = express();
const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors());
app.use(express.json());

// ========================================================================
// Helper: Normalize Dates
// ========================================================================
function normalizeDate(dateString) {
  if (!dateString) return null;

  try {
    // ✓ Caso 1: ya viene como YYYY-MM-DD o YYYY-MM
    if (/^\d{4}-\d{2}(-\d{2})?$/.test(dateString)) {
      return dateString;
    }

    // Mapeo de meses
    const meses = {
      enero: "01", febrero: "02", marzo: "03", abril: "04",
      mayo: "05", junio: "06", julio: "07", agosto: "08",
      septiembre: "09", setiembre: "09",
      octubre: "10", noviembre: "11", diciembre: "12",
    };

    const lower = dateString.toLowerCase().trim();

    // ✓ Caso 2: "mes de año" o "mes año"
    const match = lower.match(/([a-záéíóú]+)\s*(de)?\s*(\d{2,4})/);
    if (match) {
      const mes = meses[match[1]];
      
      let year = match[3];

      // convertir año de 2 dígitos → 20xx
      if (year.length === 2) {
        year = "20" + year;
      }

      if (mes) return `${year}-${mes}-01`;
    }

    // ✓ Caso 3: solo año "2015"
    if (/^\d{4}$/.test(lower)) {
      return `${lower}-01-01`;
    }

    // ✓ Caso 4: intentar con Date()
    const d = new Date(dateString);
    if (!isNaN(d.getTime())) {
      return d.toISOString().split("T")[0];
    }

    // Si todo falla
    return null;
  } catch {
    return null;
  }
}


// ========================================================================
// USER ENDPOINTS
// ========================================================================
app.get("/usuarios", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id_usuario, nombre, apellido, correo FROM usuario"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

app.post("/usuarios", async (req, res) => {
  const { nombre, apellido, correo, contrasenia } = req.body;

  if (!nombre || !apellido || !correo || !contrasenia)
    return res.status(400).json({ error: "Todos los campos son obligatorios" });

  try {
    const password_hash = await argon2.hash(contrasenia);

    const result = await pool.query(
      `INSERT INTO usuario (nombre, apellido, correo, password_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING id_usuario, nombre, apellido, correo`,
      [nombre, apellido, correo, password_hash]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === "23505") {
      res.status(400).json({ error: "El correo ya está registrado" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

app.post("/login", async (req, res) => {
  const { correo, contrasenia } = req.body;

  if (!correo || !contrasenia)
    return res.status(400).json({ error: "Correo y contraseña son requeridos" });

  try {
    const result = await pool.query(
      "SELECT * FROM usuario WHERE correo = $1",
      [correo]
    );

    const user = result.rows[0];
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const valid = await argon2.verify(user.password_hash, contrasenia);
    if (!valid) return res.status(401).json({ error: "Credenciales incorrectas" });

    res.json({
      ok: true,
      usuario: {
        id_usuario: user.id_usuario,
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo,
      },
    });
  } catch (err) {
    res.status(500).json({ ok: false, message: "Error del servidor" });
  }
});

// AI HELP 
app.post("/ai-help", async (req, res) => {
  const { section, data } = req.body;

  if (!section)
    return res.status(400).json({ error: "Falta 'section'." });

  try {
    // ==========================================================
    //  DETECCIÓN INTELIGENTE DE "EXPERIENCIA" VACÍA
    // ==========================================================
    if (section === "experiencia") {
      const puesto = data?.puesto?.trim?.() || "";
      const descripcion = data?.descripcion?.trim?.() || "";

      const experienciaVacia =
        (!puesto || puesto.toLowerCase().includes("experiencia")) &&
        (!descripcion || descripcion.length < 3);

      if (experienciaVacia) {
        return res.json({
          suggestion:
            "Aún no cuento con experiencia laboral formal, pero estoy motivado(a) por aprender, desarrollarme profesionalmente y contribuir de manera responsable en los proyectos en los que participe.",
        });
      }
    }

    // ==========================================================
    // 🧠 Texto normal o de otras secciones
    // ==========================================================
    let text = "";

    if (typeof data === "string") {
      text = data.trim();
    } else if (typeof data === "object" && data !== null) {
      // Si tiene "descripcion", usarla
      if (data.descripcion) {
        text = data.descripcion.trim();
      } else {
        text = JSON.stringify(data).trim();
      }
    }

    // Cualquier otra sección con texto vacío → default corto
    if (text.length === 0) {
      return res.json({
        suggestion:
          "Actualmente estoy desarrollando mis habilidades y busco oportunidades para continuar creciendo profesionalmente.",
      });
    }

    // ==========================================================
    // IA NORMAL
    // ==========================================================
    const prompt = `
Eres experto en redacción de currículums.
Mejora el siguiente texto sin inventar datos y sin usar encabezados.
Devuelve solo el texto final:

${text}
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Devuelve únicamente el texto mejorado." },
        { role: "user", content: prompt },
      ],
      temperature: 0.6,
    });

    const suggestion =
      completion.choices?.[0]?.message?.content?.trim() || "";

    return res.json({ suggestion });

  } catch (error) {
    console.error("❌ Error en AI HELP:", error);
    return res.status(500).json({ error: "Error generando sugerencia con IA." });
  }
});


// ========================================================================
// ROUTES (CV now lives here!!)
// ========================================================================
const cvRoutes = require("./routes/cv");
app.use("/api", cvRoutes);

// ========================================================================
// START SERVER
// ========================================================================
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
