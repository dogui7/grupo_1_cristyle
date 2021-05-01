------------------------------------------------ erase everything ------------------------------------------------

-- products --
DELETE FROM cristyledb.products;
ALTER TABLE cristyledb.products AUTO_INCREMENT=1;

-- users --
DELETE FROM cristyledb.users;
ALTER TABLE cristyledb.users AUTO_INCREMENT=1;

-- categories --
DELETE FROM cristyledb.categories;
ALTER TABLE cristyledb.categories AUTO_INCREMENT=1;

-- sizes --
DELETE FROM cristyledb.sizes;
ALTER TABLE cristyledb.sizes AUTO_INCREMENT=1;

-- roles --
DELETE FROM cristyledb.roles;
ALTER TABLE cristyledb.roles AUTO_INCREMENT=1;

-- carts --
-- cartsProducts --

------------------------------------------------ populate everything ------------------------------------------------

-- categories --
INSERT INTO cristyledb.categories (id, category) VALUES
(1, "Tops"), (2, "Camperas"), (3, "Pantalones"), (4, "Calzados"), (5, "Accesorios");

-- sizes --
INSERT INTO cristyledb.sizes (id, size) VALUES
(1, "Small"), (2, "Medium"), (3, "Large");

-- roles --
INSERT INTO cristyledb.roles (id, role) VALUES
(1, "Admin"), (2, "Cliente");

-- products --
INSERT INTO cristyleDB.products (id, name, description, price, discount, categoryId, sizeId, image, gender, deleted) VALUES 
(1, "Campera Cristyle", "Campera de cuero sintético", 4500, 15, 2, 2, "camperaCristyle.jpg", "mujer", 0), 
(2, "Reloj Cristyle", "Reloj de muñeca", 2200, 0, 5, 1, "relojCristyle.jpg", "hombre", 0), 
(3, "Campera de jean", "Campera de jean deshilachado intencional", 3000, 10, 2, 2, "camperaJean.jpg", "mujer", 0), 
(4, "Mocasines Cristyle", "Mocasiones de cuero y base de goma", 8000, 20, 4, 1, "mocasinesCristyle.jpg", "mujer", 0), 
(5, "Short jean", "Short de jean elastizado tiro alto", 1800, 30, 3, 2, "shortJean.jpg", "mujer", 0), 
(6, "Top Cristyle", "Top con mangas largas transparentes", 950, 0, 1, 1, "topNegro.jpg", "mujer", 0), 
(7, "Tacos Cristyle", "Tacos altos negro oscuro", 2600, 15, 4, 2, "tacosAltos.jpg", "mujer", 0), 
(8, "Jean Cristyle", "Jean holgado", 2500, 10, 3, 3, "jeanCristyle.jpg", "mujer", 0), 
(9, "Top negro", "Top con mangas largas transparentes", 1200, 40, 1, 2, "topNegro.jpg", "mujer", 0), 
(10, "Collar Cristyle", "Collar de oro y plata", 2700, 35, 5, 1, "collarCristyle.jpg", "mujer", 0), 
(11, "Zapatos Marcel", "Zapatos de cuero entrelazado", 6900, 15, 4, 2, "zapatosMarcel.jpg", "hombre", 0), 
(12, "Saco Brodv", "Saco de traje entallado azul marino", 4800, 20, 1, 2, "saco.jpg", "hombre", 0), 
(13, "Cinturón Cristyle", "Cinturón de cuero marrón", 1200, 20, 5, 2, "cinturon.jpg", "hombre", 0), 
(14, "Camisa Rav", "Camisa de algodón texturado", 5600, 20, 1, 2, "camisa.jpg", "hombre", 0), 
(15, "Chaleco Benetton", "Chaleco con bolsillo porta-pañuelo", 5400, 10, 1, 2, "chaleco.jpg", "hombre", 0), 
(16, "Moño Stonewall", "Moño símil seda rosado", 2600, 10, 5, 2, "moño.jpg", "hombre", 0), 
(17, "Corbata Flowers", "Corbata símil seda rosado", 2100, 10, 5, 2, "corbata.jpg", "hombre", 0), 
(18, "Bermuda Wilson", "Bermuda slim fit de gabardina", 3600, 0, 3, 2, "bermudas.jpg", "hombre", 0), 
(19, "Pantalón Brighton", "Pantalón de traje molde clásico", 4200, 10, 3, 2, "pantalon.jpg", "hombre", 0);

-- users --
INSERT INTO cristyledb.users (id, firstName, lastName, email, password, birthdate, roleId, profileImage, deleted) VALUES 
(1, "Admin", "Genial", "admin@gmail.com", "$2a$10$csN1pQRb36oEutC4O82y5e/Eat4vhzDU2TXf7CQLcitxlBBZ7.WsG", "1990-01-01", 1, "admin.jpg", 0),
(2, "Cliente", "Genial", "cliente@gmail.com", "$2a$10$csN1pQRb36oEutC4O82y5e/Eat4vhzDU2TXf7CQLcitxlBBZ7.WsG", "1990-01-01", 2, "cliente.jpg", 0);

-- carts --
-- cartsProducts --