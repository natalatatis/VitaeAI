require('dotenv').config();
const express = require('express');
const cors = require('cors');
const argon2 = require('argon2');
const pool = require('./db');
const app = express();
const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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

// Endpoint para generar texto con IA a partir de la info personal
app.post("/generate-personal-info", async (req, res) => {
  const { nombre, apellido, correo, telefono, ciudad } = req.body;

  if (!nombre || !apellido || !correo || !telefono || !ciudad) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  const prompt = `
Crea una breve introducción profesional para un CV usando esta información:
Nombre: ${nombre} ${apellido}
Email: ${correo}
Teléfono: ${telefono}
Ciudad: ${ciudad}
Hazlo conciso, profesional y adecuado para un CV.
`;

  try {
    const response = await openai.responses.create({
      model: "gpt-5-nano",
      input: prompt,
      reasoning: { effort: "low" },    // opcional, acelera respuesta
      text: { verbosity: "low" }       // opcional, hace la respuesta más concisa
    });

    // GPT-5 Responses API devuelve el texto ya en un campo cómodo
    const text = response.output_text?.trim();

    if (!text) {
      console.warn("OpenAI no devolvió texto:", response);
      return res.status(500).json({ error: "OpenAI no devolvió texto" });
    }

    res.json({ text });
  } catch (err) {
    console.error("ERROR GENERANDO TEXTO IA:", err);
    res.status(500).json({ error: "Error generando texto con IA" });
  }
});


// Endpoint para mejorar el texto "Acerca de" con IA
app.post("/enhance-about", async (req, res) => {
  const { acercaDe } = req.body;

  if (!acercaDe) return res.status(400).json({ error: "Texto requerido" });

  const prompt = `
Mejora el siguiente texto para que suene profesional y atractivo para un CV:
"${acercaDe}"
Mantén el contenido verdadero y conciso. Si el texto es muy ambiguo, hazlo más claro. No des las recomendaiones, solo mejora el texto.
`;

  try {
    const response = await openai.responses.create({
      model: "gpt-5-nano",
      input: prompt,
      reasoning: { effort: "low" },
      text: { verbosity: "low" }
    });

    const text = response.output_text?.trim();

    if (!text) {
      console.warn("OpenAI no devolvió texto:", response);
      return res.status(500).json({ error: "OpenAI no devolvió texto" });
    }

    res.json({ text });
  } catch (err) {
    console.error("ERROR MEJORANDO TEXTO IA:", err);
    res.status(500).json({ error: "Error mejorando texto con IA" });
  }
});

// Endpoint para mejorar la experiencia con IA
app.post("/enhance-exp", async (req, res) => {
  const { experiencia } = req.body;

  if (!experiencia || !experiencia[0]?.descripcion) {
    return res.status(400).json({ error: "Experiencia requerida" });
  }

  const prompt = `
Toma este texto sobre la experiencia laboral o proyectos:
"${experiencia[0].descripcion}"
Genera un párrafo conciso, profesional y adecuado para un CV. 
No uses bullets ni listasciones breves.  No des las recomendaiones, solo mejora el texto.
`;

  try {
    const response = await openai.responses.create({
      model: "gpt-5-nano",
      input: prompt,
      text: { verbosity: "low" } // conciso
    });

    const text = response.output_text?.trim();

    if (!text) {
      return res.status(500).json({ error: "OpenAI no devolvió texto" });
    }

    res.json({ text });
  } catch (err) {
    console.error("ERROR MEJORANDO EXPERIENCIA IA:", err);
    res.status(500).json({ error: "Error mejorando experiencia con IA" });
  }
});


// Endpoint para redactar mejor la educación con IA
app.post("/enhance-education", async (req, res) => {
  const { educacion} = req.body;

  if (!educacion || !educacion[0]?.descripcion) {
    return res.status(400).json({ error: "Educación requerida" });
  }

  const prompt = `
Mejorar este texto sobre formación académica o cursos:
"${educacion[0].descripcion}"
Mantén el contenido verdadero. Hazlo profesional y adecuado para un CV. Si es necesario, utiliza bullet points.  No des las recomendaiones, solo mejora el texto.
`;

  try {
    const response = await openai.responses.create({
      model: "gpt-5-nano",
      input: prompt,
      text: { verbosity: "low" } // conciso
    });

    const text = response.output_text?.trim();

    if (!text) {
      return res.status(500).json({ error: "OpenAI no devolvió texto" });
    }

    res.json({ text });
  } catch (err) {
    console.error("ERROR MEJORANDO TEXTO DE EDUCACIÓN:", err);
    res.status(500).json({ error: "Error mejorando educación con IA" });
  }
});


// Endpoint para mejorar habilidades con IA
app.post("/enhance-skills", async (req, res) => {
  const { habilidades } = req.body;

  if (!habilidades || !habilidades.length || !habilidades[0]) {
    return res.status(400).json({ error: "Texto de habilidades requerido" });
  }

  const prompt = `
Convierte estas habilidades en una lista profesional para un CV:
"${habilidades[0]}"
Hazlo atractivo para reclutadores. No des las recomendaciones, solo mejora el texto.
No te extiendas mucho explicando qué es cada habilidad, ni pongas información irrelevante. Sé breve y directo. 
`;

  try {
    const response = await openai.responses.create({
      model: "gpt-5-nano",
      input: prompt,
      text: { verbosity: "low" } 
    });

    const text = response.output_text?.trim();

    if (!text) {
      return res.status(500).json({ error: "OpenAI no devolvió texto" });
    }

    res.json({ text });
  } catch (err) {
    console.error("ERROR MEJORANDO TEXTO DE EDUCACIÓN:", err);
    res.status(500).json({ error: "Error mejorando educación con IA" });
  }
});


// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
