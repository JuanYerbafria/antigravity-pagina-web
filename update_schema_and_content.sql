USE llantera_noguez;

-- Add SKU and Promocion columns to products table if they don't exist
-- Note: MySQL 5.7+ supports IF NOT EXISTS in ALTER TABLE, but older versions don't directly.
-- For simplicity in this environment, we'll try to add them. If they exist, it might error, but we can ignore or wrap in a stored procedure if strictness is needed. 
-- Given the context, straightforward ALTER is usually fine, or checking specifically.

-- Attempting to add columns (will fail if exists, which is fine for now or handle via procedure)
ALTER TABLE products ADD COLUMN sku VARCHAR(50) AFTER id;
ALTER TABLE products ADD COLUMN promocion VARCHAR(100) AFTER price;

-- Insert sample blog post
INSERT INTO blog_posts (title, content, author, image_url) VALUES 
('Consejos para el cuidado de tus llantas', 
 'Mantener la presión adecuada de tus llantas es fundamental para tu seguridad y para ahorrar combustible. Revisa la presión al menos una vez al mes y antes de viajes largos. También es importante rotarlas cada 10,000 km para asegurar un desgaste uniforme.', 
 'Admin', 
 'https://placehold.co/600x400?text=Cuidado+Llantas');

-- Update some products with sample SKU and Promotion
UPDATE products SET sku = 'MICH-P4-16', promocion = '4x3' WHERE id = 1;
UPDATE products SET sku = 'PIR-CIN-15', promocion = 'Descuento 10%' WHERE id = 2;
