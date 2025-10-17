CREATE DATABASE proyecto;
\c proyecto;

CREATE TABLE Usuario (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(125),
    apellido VARCHAR(125),
    correo VARCHAR(125) UNIQUE,
    password_hash VARCHAR(255),
    estado BOOLEAN DEFAULT TRUE -- true = activo, false = inactivo
);

CREATE TABLE DatosPersonales (
    id_datos SERIAL PRIMARY KEY,
    telefono VARCHAR(8),
    direccion VARCHAR(200),
    fecha_nacimiento DATE,
    nacionalidad VARCHAR(50),
    id_usuario INT,
    estado BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE
);

CREATE TABLE ExperienciaLaboral (
    id_experiencia SERIAL PRIMARY KEY,
    empresa VARCHAR(225),
    puesto VARCHAR(150),
    fecha_inicio DATE,
    fecha_fin DATE,
    descripcion TEXT,
    id_usuario INT,
    estado BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE
);

CREATE TABLE Educacion (
    id_educacion SERIAL PRIMARY KEY,
    institucion VARCHAR(150),
    titulo VARCHAR(200),
    fecha_inicio DATE,
    fecha_fin DATE,
    id_usuario INT,
    estado BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE
);

CREATE TABLE Habilidad (
    id_habilidad SERIAL PRIMARY KEY,
    nombre_habilidad VARCHAR(100),
    nivel VARCHAR(50),
    id_usuario INT,
    estado BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE
);

CREATE TABLE Idioma (
    id_idioma SERIAL PRIMARY KEY,
    nombre_idioma VARCHAR(100),
    nivel VARCHAR(50),
    id_usuario INT,
    estado BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE
);

CREATE TABLE CvTemporal (
  id_cv SERIAL PRIMARY KEY,
  id_usuario INT REFERENCES Usuario(id_usuario) ON DELETE CASCADE,
  resumen TEXT,
  acerca_de TEXT,
  experiencia TEXT,
  educacion TEXT,
  habilidades TEXT,
  idiomas TEXT,
  estado BOOLEAN DEFAULT TRUE
);
