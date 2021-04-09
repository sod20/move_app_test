INSERT INTO contacts(email, is_active, created, modified, last_login)  VALUES ('test@dominio.cl', true, NOW(), NOW(), NOW());

INSERT INTO phones(number, city_code, country_code, contact_id) VALUES (987654321, 12, 12, 1);

INSERT INTO users(username, password, enabled)  VALUES ('test@dominio.cl', '$2a$10$JTixTp05HtucFu2Q1O/7g.pN.c9lzQtcBSDdhKJ7/kI9OogT8REdq', true);