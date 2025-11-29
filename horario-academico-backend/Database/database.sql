CREATE DATABASE IF NOT EXISTS horario_academico;
USE horario_academico;

-- Tabla de usuarios
CREATE TABLE usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  rol ENUM('estudiante', 'profesor', 'admin') DEFAULT 'estudiante',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de asignaturas
CREATE TABLE asignatura (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  codigo VARCHAR(20) UNIQUE NOT NULL,
  creditos INT NOT NULL,
  max_clases_semana INT NOT NULL DEFAULT 3,
  descripcion TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de horarios
CREATE TABLE schedules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  dia ENUM('lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado') NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fin TIME NOT NULL,
  id_usuario INT NOT NULL,
  id_asignatura INT NOT NULL,
  salon VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE,
  FOREIGN KEY (id_asignatura) REFERENCES asignatura(id) ON DELETE CASCADE
);

-- Datos de prueba
INSERT INTO usuario (nombre, email, password, rol) VALUES
('Juan Pérez', 'juan@example.com', '$2b$10$WQZg17t/.szNG4Nmf46aee.qLX/IhCL29Tuu0NL.wJ7mCACo7TdqK', 'estudiante'),
('María García', 'maria@example.com', '$2b$10$WQZg17t/.szNG4Nmf46aee.qLX/IhCL29Tuu0NL.wJ7mCACo7TdqK', 'profesor'),
('Admin User', 'admin@example.com', '$2b$10$.Xs7faPUrUSfGt4d8iWBb.lbf2YGRNiH3DPnK8VszkMzdyZ.ScrVG', 'admin');

INSERT INTO asignatura (nombre, codigo, creditos, max_clases_semana, descripcion) VALUES
('Programación Web', 'PW101', 4, 3, 'Desarrollo de aplicaciones web'),
('Base de Datos', 'BD201', 3, 2, 'Diseño y gestión de bases de datos'),
('Matemáticas', 'MAT101', 4, 3, 'Cálculo diferencial e integral');

INSERT INTO schedules (dia, hora_inicio, hora_fin, id_usuario, id_asignatura, salon) VALUES
('lunes', '08:00:00', '10:00:00', 1, 1, 'A-101'),
('miercoles', '08:00:00', '10:00:00', 1, 1, 'A-101'),
('martes', '14:00:00', '16:00:00', 1, 2, 'B-202');