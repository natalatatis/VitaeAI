// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const argon2 = require("argon2");
const pool = require("./db");
const OpenAI = require("openai");

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ============================================================
// FIX: Aumentar límite para permitir imágenes base64
// ============================================================
app.use(cors());
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

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
    console.error("❌ Error usuarios:", err);
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
      console.error("❌ Error creando usuario:", err);
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
    console.error("❌ Error login:", err);
    res.status(500).json({ ok: false, message: "Error del servidor" });
  }
});

// ========================================================================
// AI HELP
// ========================================================================
app.post("/api/ai-help", async (req, res) => {
  const { section, data } = req.body;

  try {
    if (section === "experiencia" && data?.sinExperiencia) {
      return res.json({
        suggestion:
          "Aún no cuento con experiencia laboral formal, pero estoy motivado(a) por aprender y desarrollarme profesionalmente.",
      });
    }

    let text = "";

    if (typeof data === "string") text = data.trim();
    else if (Array.isArray(data)) {
      text = data
        .map((item) => item.descripcion || item.puesto || "")
        .filter(Boolean)
        .join(". ");
    } else if (typeof data === "object" && data !== null) {
      text = Object.values(data)
        .join(" ")
        .replace(/sinExperiencia/gi, "")
        .trim();
    }

    if (text.length < 3) {
      return res.json({
        suggestion:
          "Busco aprender, desarrollarme profesionalmente y aportar de manera responsable en nuevos proyectos.",
      });
    }

    const prompt = `
      Eres un experto redactando curriculums, mejora este texto para un currículum.
      Agrega aglo de información genérica para rellenar. No inventes datos y no uses viñetas:

      ${text}
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Responde solo con el texto corregido." },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
    });

    const suggestion = completion.choices?.[0]?.message?.content?.trim();
    return res.json({ suggestion });
  } catch (err) {
    console.error("❌ AI Error:", err);
    return res.status(500).json({ error: "Error al generar sugerencia" });
  }
});

// ========================================================================
// ROUTES CV
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
