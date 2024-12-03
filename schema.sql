DROP SCHEMA tenant1 CASCADE;
DROP SCHEMA tenant2 CASCADE;
DROP SCHEMA tenant3 CASCADE;
DROP SCHEMA tenant4 CASCADE;
DROP SCHEMA tenant5 CASCADE;


CREATE SCHEMA tenant1;

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
