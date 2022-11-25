-- Create a keyspace
CREATE KEYSPACE IF NOT EXISTS app WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : '1' };

-- Create a table
CREATE TABLE IF NOT EXISTS app.product (
id text PRIMARY KEY,
nom text,
prix int
);

-- Insert some data
INSERT INTO app.product
(id, nom, prix)
VALUES ('67a84260-72e5-4a8e-8e0f-70052d6f089e', 'MacBook Air M2 (2022), 16goRAM, 256GO', 1799);