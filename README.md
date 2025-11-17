# 📄 VitaeAI

VitaeAI es una aplicación web que permite generar currículums profesionales utilizando plantillas modernas y asistencia con inteligencia artificial.  
Incluye autenticación, edición completa del CV, vista previa en tiempo real, exportación a PDF y sugerencias automáticas generadas por IA.

---

## 🚀 Características principales

- 🧍 Registro e inicio de sesión de usuarios  
- 📝 Creación y edición de CVs  
- 🎨 Vista previa dinámica con múltiples plantillas  
- 🤖 Sugerencias automáticas usando OpenAI  
- 📄 Exportación a PDF (html2canvas + jsPDF)  
- 💾 Guardado de CVs en PostgreSQL  

---

## 🧩 Tecnologías utilizadas

### **Frontend**
- React  
- Vite  
- Material UI  
- React Router  
- Axios  
- html2canvas  
- jsPDF  

### **Backend**
- Node.js  
- Express.js  
- Argon2  
- OpenAI API  
- CORS  
- PostgreSQL (pg)

---

## 📁 Estructura del proyecto
```bash
my-app/
│
├── backend/
│ ├── server.js
│ ├── db.js
│ ├── routes/
│ │ └── cv.js
│ ├── package.json
│ └── ...
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── plantillas/
│ │ └── main.jsx
│ ├── public/
│ ├── index.html
│
├── Dockerfile
├── package.json
└── README.md
```

---

## 🛠️ Instalación y ejecución local

### 1. Clonar repositorio
```bash
git clone [https://github.com/tu-usuario/vitaeai.git](https://github.com/natalatatis/VitaeAI/tree/rosangela-rama)
cd VitaeAI

2. Instalar frontend
cd frontend
npm install

3. Instalar backend
cd ../backend
npm install

4. Variables de entorno

Crear archivo .env dentro de /backend/:

OPENAI_API_KEY=sk-xxxxxx
PORT=8080
Crear una API Key de OPENAI

5. Ejecutar backend
node server.js

6. Ejecutar frontend
cd ../frontend
npm run dev
```

## 👩‍💻 Autores

- **Rosángela Rodríguez**
- **Natalia Sosa**

### 📚 Proyecto — Ingeniería de Software y Ciencias de la Computación VI  
**Universidad Galileo — 2025**
