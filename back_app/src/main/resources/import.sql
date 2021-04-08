INSERT INTO contacts(email, password, is_active, created, modified, last_login) VALUES ('alejandro.naranjo@gmail.com', '$2a$10$O9wxmH/AeyZZzIS09Wp8YOEMvFnbRVJ8B4dmAMVSGloR62lj.yqXG', true, NOW(), NOW(), NOW());

INSERT INTO phones(number, city_code, country_code, contact_id) VALUES (987654321, 12, 12, 1);