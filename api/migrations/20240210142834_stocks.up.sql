CREATE TABLE stocks
(
    id     SERIAL PRIMARY KEY,
    symbol VARCHAR(10) UNIQUE NOT NULL,
    name   VARCHAR(255)       NOT NULL
);