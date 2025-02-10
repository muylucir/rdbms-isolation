REVOKE ALL ON ALL TABLES IN SCHEMA tenant1 FROM tenant1;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA tenant1 FROM tenant1;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA tenant1 FROM tenant1;
REVOKE USAGE ON SCHEMA tenant1 FROM tenant1;
DROP ROLE tenant1;
DROP SCHEMA tenant1 CASCADE;

REVOKE ALL ON ALL TABLES IN SCHEMA tenant2 FROM tenant2;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA tenant2 FROM tenant2;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA tenant2 FROM tenant2;
REVOKE USAGE ON SCHEMA tenant1 FROM tenant2;
DROP ROLE tenant2;
DROP SCHEMA tenant2 CASCADE;

REVOKE ALL ON ALL TABLES IN SCHEMA tenant3 FROM tenant3;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA tenant3 FROM tenant3;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA tenant3 FROM tenant3;
REVOKE USAGE ON SCHEMA tenant1 FROM tenant3;
DROP ROLE tenant3;
DROP SCHEMA tenant3 CASCADE;

REVOKE ALL ON ALL TABLES IN SCHEMA tenant4 FROM tenant4;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA tenant4 FROM tenant4;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA tenant4 FROM tenant4;
REVOKE USAGE ON SCHEMA tenant1 FROM tenant4;
DROP ROLE tenant4;
DROP SCHEMA tenant4 CASCADE;

REVOKE ALL ON ALL TABLES IN SCHEMA tenant5 FROM tenant5;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA tenant5 FROM tenant5;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA tenant5 FROM tenant5;
REVOKE USAGE ON SCHEMA tenant1 FROM tenant5;
DROP ROLE tenant5 CASCADE;
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
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES tenant1.users(id)
);

CREATE TABLE IF NOT EXISTS tenant1.order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(19,2) NOT NULL,
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES tenant1.orders(id),
    CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES tenant1.products(id)
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON tenant1.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON tenant1.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON tenant1.order_items(product_id);

CREATE ROLE tenant1;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA tenant1 TO tenant1;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA tenant1 TO tenant1;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA tenant1 TO tenant1;
GRANT USAGE ON SCHEMA tenant1 TO tenant1;

CREATE SCHEMA tenant2;
CREATE ROLE tenant2;

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
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES tenant2.users(id)
);

CREATE TABLE IF NOT EXISTS tenant2.order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(19,2) NOT NULL,
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES tenant2.orders(id),
    CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES tenant2.products(id)
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON tenant2.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON tenant2.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON tenant2.order_items(product_id);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA tenant2 TO tenant2;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA tenant2 TO tenant2;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA tenant2 TO tenant2;
GRANT USAGE ON SCHEMA tenant2 TO tenant2;

CREATE SCHEMA tenant3;
CREATE ROLE tenant3;

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
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES tenant3.users(id)
);

CREATE TABLE IF NOT EXISTS tenant3.order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(19,2) NOT NULL,
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES tenant3.orders(id),
    CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES tenant3.products(id)
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON tenant3.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON tenant3.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON tenant3.order_items(product_id);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA tenant3 TO tenant3;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA tenant3 TO tenant3;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA tenant3 TO tenant3;
GRANT USAGE ON SCHEMA tenant3 TO tenant3;

CREATE SCHEMA tenant4;
CREATE ROLE tenant4;

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
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES tenant4.users(id)
);

CREATE TABLE IF NOT EXISTS tenant4.order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(19,2) NOT NULL,
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES tenant4.orders(id),
    CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES tenant4.products(id)
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON tenant4.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON tenant4.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON tenant4.order_items(product_id);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA tenant4 TO tenant4;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA tenant4 TO tenant4;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA tenant4 TO tenant4;
GRANT USAGE ON SCHEMA tenant4 TO tenant4;

CREATE SCHEMA tenant5;
CREATE ROLE tenant5;

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
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES tenant5.users(id)
);

CREATE TABLE IF NOT EXISTS tenant5.order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(19,2) NOT NULL,
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES tenant5.orders(id),
    CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES tenant5.products(id)
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON tenant5.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON tenant5.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON tenant5.order_items(product_id);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA tenant5 TO tenant5;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA tenant5 TO tenant5;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA tenant5 TO tenant5;
GRANT USAGE ON SCHEMA tenant5 TO tenant5;