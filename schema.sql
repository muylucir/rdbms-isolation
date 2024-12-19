DROP SCHEMA tenant1 CASCADE;
DROP ROLE tenant1;
DROP SCHEMA tenant2 CASCADE;
DROP ROLE tenant2;
DROP SCHEMA tenant3 CASCADE;
DROP ROLE tenant3;
DROP SCHEMA tenant4 CASCADE;
DROP ROLE tenant4;
DROP SCHEMA tenant5 CASCADE;
DROP ROLE tenant5;


CREATE SCHEMA tenant1;
CREATE ROLE tenant1;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA tenant1 TO tenant1;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA tenant1 TO tenant1;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA tenant1 TO tenant1;
GRANT USAGE ON SCHEMA tenant1 TO tenant1;
ALTER DEFAULT PRIVILEGES IN SCHEMA tenant1 GRANT ALL PRIVILEGES ON TABLES TO tenant1;
ALTER DEFAULT PRIVILEGES IN SCHEMA tenant1 GRANT ALL PRIVILEGES ON SEQUENCES TO tenant1;
ALTER DEFAULT PRIVILEGES IN SCHEMA tenant1 GRANT ALL PRIVILEGES ON FUNCTIONS TO tenant1;


CREATE TABLE IF NOT EXISTS tenant1.users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS tenant1.products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(19,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS tenant1.orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    order_date TIMESTAMP NOT NULL,
    total_amount DECIMAL(19,2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS tenant1.order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(19,2) NOT NULL,
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id),
    CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON tenant1.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON tenant1.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON tenant1.order_items(product_id);

CREATE SCHEMA tenant2;
CREATE ROLE tenant2;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA tenant2 TO tenant2;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA tenant2 TO tenant2;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA tenant2 TO tenant2;
GRANT USAGE ON SCHEMA tenant2 TO tenant2;
ALTER DEFAULT PRIVILEGES IN SCHEMA tenant2 GRANT ALL PRIVILEGES ON TABLES TO tenant2;
ALTER DEFAULT PRIVILEGES IN SCHEMA tenant2 GRANT ALL PRIVILEGES ON SEQUENCES TO tenant2;
ALTER DEFAULT PRIVILEGES IN SCHEMA tenant2 GRANT ALL PRIVILEGES ON FUNCTIONS TO tenant2;

CREATE TABLE IF NOT EXISTS tenant2.users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS tenant2.products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(19,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS tenant2.orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    order_date TIMESTAMP NOT NULL,
    total_amount DECIMAL(19,2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS tenant2.order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(19,2) NOT NULL,
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id),
    CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON tenant2.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON tenant2.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON tenant2.order_items(product_id);

CREATE SCHEMA tenant3;
CREATE ROLE tenant3;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA tenant3 TO tenant3;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA tenant3 TO tenant3;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA tenant3 TO tenant3;
GRANT USAGE ON SCHEMA tenant3 TO tenant3;
ALTER DEFAULT PRIVILEGES IN SCHEMA tenant3 GRANT ALL PRIVILEGES ON TABLES TO tenant3;
ALTER DEFAULT PRIVILEGES IN SCHEMA tenant3 GRANT ALL PRIVILEGES ON SEQUENCES TO tenant3;
ALTER DEFAULT PRIVILEGES IN SCHEMA tenant3 GRANT ALL PRIVILEGES ON FUNCTIONS TO tenant3;

CREATE TABLE IF NOT EXISTS tenant3.users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS tenant3.products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(19,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS tenant3.orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    order_date TIMESTAMP NOT NULL,
    total_amount DECIMAL(19,2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS tenant3.order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(19,2) NOT NULL,
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id),
    CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON tenant3.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON tenant3.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON tenant3.order_items(product_id);

CREATE SCHEMA tenant4;
CREATE ROLE tenant4;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA tenant4 TO tenant4;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA tenant4 TO tenant4;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA tenant4 TO tenant4;
GRANT USAGE ON SCHEMA tenant4 TO tenant4;
ALTER DEFAULT PRIVILEGES IN SCHEMA tenant4 GRANT ALL PRIVILEGES ON TABLES TO tenant4;
ALTER DEFAULT PRIVILEGES IN SCHEMA tenant4 GRANT ALL PRIVILEGES ON SEQUENCES TO tenant4;
ALTER DEFAULT PRIVILEGES IN SCHEMA tenant4 GRANT ALL PRIVILEGES ON FUNCTIONS TO tenant4;

CREATE TABLE IF NOT EXISTS tenant4.users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS tenant4.products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(19,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS tenant4.orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    order_date TIMESTAMP NOT NULL,
    total_amount DECIMAL(19,2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS tenant4.order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(19,2) NOT NULL,
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id),
    CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON tenant4.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON tenant4.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON tenant4.order_items(product_id);

CREATE SCHEMA tenant5;
CREATE ROLE tenant5;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA tenant5 TO tenant5;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA tenant5 TO tenant5;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA tenant5 TO tenant5;
GRANT USAGE ON SCHEMA tenant5 TO tenant5;
ALTER DEFAULT PRIVILEGES IN SCHEMA tenant5 GRANT ALL PRIVILEGES ON TABLES TO tenant5;
ALTER DEFAULT PRIVILEGES IN SCHEMA tenant5 GRANT ALL PRIVILEGES ON SEQUENCES TO tenant5;
ALTER DEFAULT PRIVILEGES IN SCHEMA tenant5 GRANT ALL PRIVILEGES ON FUNCTIONS TO tenant5;

CREATE TABLE IF NOT EXISTS tenant5.users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS tenant5.products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(19,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS tenant5.orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    order_date TIMESTAMP NOT NULL,
    total_amount DECIMAL(19,2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS tenant5.order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(19,2) NOT NULL,
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id),
    CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON tenant5.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON tenant5.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON tenant5.order_items(product_id);