-- Add rating column to products table
USE llantera_noguez;

ALTER TABLE products 
ADD COLUMN rating DECIMAL(2,1) DEFAULT 5.0 
COMMENT 'Product rating from 0.0 to 5.0';

-- Update existing products with sample ratings
UPDATE products SET rating = 5.0 WHERE id = 1;
UPDATE products SET rating = 4.6 WHERE id = 2;
UPDATE products SET rating = 4.8 WHERE id = 3;
UPDATE products SET rating = 4.5 WHERE id = 4;
UPDATE products SET rating = 4.7 WHERE id = 5;
