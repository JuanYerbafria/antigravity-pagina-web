-- Database Creation
CREATE DATABASE IF NOT EXISTS llantera_noguez;
USE llantera_noguez;

-- Users Table (for Admin access)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category ENUM('Llantas', 'Rines', 'Baterias', 'Refacciones', 'Otros') NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    stock INT DEFAULT 0,
    specs JSON, -- Flexible field for specific attributes (e.g., tire size, rim diameter)
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    icon_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Branches Table
CREATE TABLE IF NOT EXISTS branches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    map_url TEXT,
    lat DECIMAL(10, 8),
    lng DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(100),
    image_url VARCHAR(255),
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Sample Data (Seed)

-- Users (Password: admin123 - In a real app, this should be hashed)
INSERT INTO users (username, password_hash) VALUES ('admin', 'admin123');

-- Branches (6 sucursales ficticias basadas en el requerimiento)
INSERT INTO branches (name, address, phone, map_url) VALUES 
('Sucursal Centro', 'Av. Principal 123, Centro', '555-111-2222', 'https://maps.google.com'),
('Sucursal Norte', 'Carr. Norte Km 5', '555-333-4444', 'https://maps.google.com'),
('Sucursal Sur', 'Blvd. Sur 456', '555-555-6666', 'https://maps.google.com'),
('Sucursal Este', 'Calle Oriente 789', '555-777-8888', 'https://maps.google.com'),
('Sucursal Oeste', 'Av. Poniente 321', '555-999-0000', 'https://maps.google.com'),
('Sucursal Express', 'Plaza Comercial Local 5', '555-123-4567', 'https://maps.google.com');

-- Services
INSERT INTO services (name, description) VALUES 
('Alineación', 'Alineación computarizada para mayor precisión.'),
('Balanceo', 'Evita vibraciones y desgaste irregular.'),
('Rotación de llantas', 'Extiende la vida útil de tus llantas.'),
('Cambio de batería', 'Instalación profesional de baterías.'),
('Revisión de suspensión', 'Diagnóstico completo de amortiguadores y horquillas.');

-- Products (Sample)
INSERT INTO products (name, category, price, description, image_url, is_featured, specs) VALUES 
('Michelin Primacy 4', 'Llantas', 3500.00, 'Seguridad y duración.', 'https://placehold.co/300x300?text=Michelin', TRUE, '{"medida": "205/55 R16"}'),
('Pirelli Cinturato', 'Llantas', 2800.00, 'Alto rendimiento.', 'https://placehold.co/300x300?text=Pirelli', TRUE, '{"medida": "195/65 R15"}'),
('Rin Deportivo 17"', 'Rines', 4500.00, 'Diseño aerodinámico.', 'https://placehold.co/300x300?text=Rin', TRUE, '{"diametro": "17"}'),
('Batería LTH', 'Baterias', 2100.00, 'Máxima potencia.', 'https://placehold.co/300x300?text=Bateria', TRUE, '{"tipo": "L-42"}'),
('Amortiguador Delantero', 'Refacciones', 1200.00, 'Confort y estabilidad.', 'https://placehold.co/300x300?text=Amortiguador', FALSE, '{"marca": "KYB"}');
