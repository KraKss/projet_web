DROP TABLE IF EXISTS Order_Items;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Custom_Product;
DROP TABLE IF EXISTS Product;
DROP TABLE IF EXISTS Filament;
DROP TABLE IF EXISTS Seller;
DROP TABLE IF EXISTS Review;
DROP TABLE IF EXISTS Profile;
DROP TYPE IF EXISTS payment_status;
DROP TYPE IF EXISTS shipping_status;

CREATE TABLE Profile (
                         id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                         name VARCHAR(255) NOT NULL,
                         email VARCHAR(255) UNIQUE NOT NULL,
                         password VARCHAR(255) NOT NULL, -- a changr quand il sera hashé
                         address TEXT, -- a changer pour une table addres
                         bank_account VARCHAR(255),
                         balance DECIMAL(10, 2) DEFAULT 0.00

);


CREATE TABLE Review (
                        reviewer_id INT NOT NULL,
                        seller_id INT NOT NULL,

    -- rating max 5
                        rating INT CHECK (rating >= 0 AND rating <= 5) default 0,
                        comment TEXT,
                        review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                        PRIMARY KEY (reviewer_id, seller_id),
                        FOREIGN KEY (seller_id) REFERENCES Profile(user_id),
                        FOREIGN KEY (reviewer_id) REFERENCES Profile(user_id)
);


CREATE TABLE Product (
                         product_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                         seller_id INT NOT NULL,
                         name VARCHAR(255) NOT NULL,
                         description TEXT,
                         price DECIMAL(10, 2) NOT NULL,
                         filament_type INT,
                         FOREIGN KEY (seller_id) REFERENCES Profile(user_id)
);

CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed');
CREATE TYPE shipping_status AS ENUM ('not_shipped', 'shipped', 'delivered');

CREATE TABLE Orders (
                        order_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                        buyer_id INT NOT NULL,
                        payment_status payment_status DEFAULT 'pending',
                        shipping_status shipping_status DEFAULT 'not_shipped',
                        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        FOREIGN KEY (buyer_id) REFERENCES Profile(user_id)
);

CREATE TABLE Order_Items (
                             order_id INT NOT NULL,
                             product_id INT NOT NULL,
                             quantity INT NOT NULL,
                             PRIMARY KEY (order_id, product_id),
                             FOREIGN KEY (order_id) REFERENCES Orders(order_id),
                             FOREIGN KEY (product_id) REFERENCES Product(product_id)
);
