INSERT INTO contacts(email, is_active, created, modified, last_login)  VALUES ('alejandro.naranjo@gmail.com', true, NOW(), NOW(), NOW());

INSERT INTO phones(number, city_code, country_code, contact_id) VALUES (987654321, 12, 12, 1);

INSERT INTO users(username, password, enabled)  VALUES ('alejandro.naranjo@gmail.com', '$2a$10$DOMDxjYyfZ/e7RcBfUpzqeaCs8pLgcizuiQWXPkU35nOhZlFcE9MS', true);