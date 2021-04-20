------------------------------------------------ erase everything ------------------------------------------------

-- products --
DELETE FROM cristyle_db.products;
ALTER TABLE cristyle_db.products AUTO_INCREMENT=1;

-- users --
DELETE FROM cristyle_db.users;
ALTER TABLE cristyle_db.users AUTO_INCREMENT=1;

-- product_category --
DELETE FROM cristyle_db.product_category;
ALTER TABLE cristyle_db.product_category AUTO_INCREMENT=1;

-- product_size --
DELETE FROM cristyle_db.product_size;
ALTER TABLE cristyle_db.product_size AUTO_INCREMENT=1;

-- user_role --
DELETE FROM cristyle_db.user_role;
ALTER TABLE cristyle_db.user_role AUTO_INCREMENT=1;

-- carts --
-- carts_products --

------------------------------------------------ populate everything ------------------------------------------------

-- product_category --
INSERT INTO cristyle_db.product_category (category) VALUES 
("Tops");
INSERT INTO cristyle_db.product_category (category) VALUES 
("Camperas");
INSERT INTO cristyle_db.product_category (category) VALUES 
("Pantalones");
INSERT INTO cristyle_db.product_category (category) VALUES 
("Calzados");
INSERT INTO cristyle_db.product_category (category) VALUES 
("Accesorios");

-- product_size --
INSERT INTO cristyle_db.product_size (size) VALUES 
("Small");
INSERT INTO cristyle_db.product_size (size) VALUES 
("Medium");
INSERT INTO cristyle_db.product_size (size) VALUES 
("Large");

-- user_role --
INSERT INTO cristyle_db.user_role (role) VALUES 
("Admin");
INSERT INTO cristyle_db.user_role (role) VALUES 
("Cliente");

-- products --
INSERT INTO cristyle_db.products (name, price, discount, category_id, size_id, description, image, gender) VALUES 
("Campera Cristyle", 4500, 15, 2, 2, "Campera de cuero sintético", "camperaCristyle.jpg", "mujer");
INSERT INTO cristyle_db.products (name, price, discount, category_id, size_id, description, image, gender) VALUES 
("Reloj Cristyle", 2200, 0, 5, 1, "Reloj de muñeca", "relojCristyle.jpg", "hombre");
INSERT INTO cristyle_db.products (name, price, discount, category_id, size_id, description, image, gender) VALUES 
("Campera de jean", 3000, 10, 2, 2, "Campera de jean deshilachado intencional", "camperaJean.jpg", "mujer");
INSERT INTO cristyle_db.products (name, price, discount, category_id, size_id, description, image, gender) VALUES 
("Mocasines Cristyle", 8000, 20, 4, 1, "Mocasiones de cuero y base de goma", "mocasinesCristyle.jpg", "mujer");
INSERT INTO cristyle_db.products (name, price, discount, category_id, size_id, description, image, gender) VALUES 
("Short jean", 1800, 30, 3, 2, "Short de jean elastizado tiro alto", "shortJean.jpg", "mujer");
INSERT INTO cristyle_db.products (name, price, discount, category_id, size_id, description, image, gender) VALUES 
("Top Cristyle", 950, 0, 1, 1, "Top con mangas largas transparentes", "topNegro.jpg", "mujer");
INSERT INTO cristyle_db.products (name, price, discount, category_id, size_id, description, image, gender) VALUES 
("Tacos Cristyle", 2600, 15, 4, 2, "Tacos altos negro oscuro", "tacosAltos.jpg", "mujer");
INSERT INTO cristyle_db.products (name, price, discount, category_id, size_id, description, image, gender) VALUES 
("Jean Cristyle", 2500, 10, 3, 3, "Jean holgado", "jeanCristyle.jpg", "mujer");
INSERT INTO cristyle_db.products (name, price, discount, category_id, size_id, description, image, gender) VALUES 
("Top negro", 1200, 40, 1, 2, "Top con mangas largas transparentes", "topNegro.jpg", "mujer");
INSERT INTO cristyle_db.products (name, price, discount, category_id, size_id, description, image, gender) VALUES 
("Collar Cristyle", 2700, 35, 5, 1, "Collar de oro y plata", "collarCristyle.jpg", "mujer");
INSERT INTO cristyle_db.products (name, price, discount, category_id, size_id, description, image, gender) VALUES 
("Zapatos Marcel", 6900, 15, 4, 2, "Zapatos de cuero entrelazado", "zapatosMarcel.jpg", "hombre");
INSERT INTO cristyle_db.products (name, price, discount, category_id, size_id, description, image, gender) VALUES 
("Saco Brodv", 4800, 20, 1, 2, "Saco de traje entallado azul marino", "saco.jpg", "hombre");
INSERT INTO cristyle_db.products (name, price, discount, category_id, size_id, description, image, gender) VALUES 
("Cinturón Cristyle", 1200, 20, 5, 2, "Cinturón de cuero marrón", "cinturon.jpg", "hombre");
INSERT INTO cristyle_db.products (name, price, discount, category_id, size_id, description, image, gender) VALUES 
("Camisa Rav", 5600, 20, 1, 2, "Camisa de algodón texturado", "camisa.jpg", "hombre");
INSERT INTO cristyle_db.products (name, price, discount, category_id, size_id, description, image, gender) VALUES 
("Chaleco Benetton", 5400, 10, 1, 2, "Chaleco con bolsillo porta-pañuelo", "chaleco.jpg", "hombre");
INSERT INTO cristyle_db.products (name, price, discount, category_id, size_id, description, image, gender) VALUES 
("Moño Stonewall", 2600, 10, 5, 2, "Moño símil seda rosado", "moño.jpg", "hombre");
INSERT INTO cristyle_db.products (name, price, discount, category_id, size_id, description, image, gender) VALUES 
("Corbata Flowers", 2100, 10, 5, 2, "Corbata símil seda rosado", "corbata.jpg", "hombre");
INSERT INTO cristyle_db.products (name, price, discount, category_id, size_id, description, image, gender) VALUES 
("Bermuda Wilson", 3600, 0, 3, 2, "Bermuda slim fit de gabardina", "bermudas.jpg", "hombre");
INSERT INTO cristyle_db.products (name, price, discount, category_id, size_id, description, image, gender) VALUES 
("Pantalón Brighton", 4200, 10, 3, 2, "Pantalón de traje molde clásico", "pantalon.jpg", "hombre");

-- users --
INSERT INTO cristyle_db.users (first_name, last_name, email, password, birthdate, role_id, profile_image) VALUES 
("Admin", "Genial", "admin@gmail.com", "$2a$10$csN1pQRb36oEutC4O82y5e/Eat4vhzDU2TXf7CQLcitxlBBZ7.WsG", "1990-01-01", 1, "admin.jpg");
INSERT INTO cristyle_db.users (first_name, last_name, email, password, birthdate, role_id, profile_image) VALUES 
("Cliente", "Genial", "cliente@gmail.com", "$2a$10$csN1pQRb36oEutC4O82y5e/Eat4vhzDU2TXf7CQLcitxlBBZ7.WsG", "1990-01-01", 2, "cliente.jpg");

-- carts --
-- carts_products --