--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Debian 17.2-1.pgdg120+1)
-- Dumped by pg_dump version 17.2 (Debian 17.2-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.review DROP CONSTRAINT IF EXISTS review_seller_id_fkey;
ALTER TABLE IF EXISTS ONLY public.review DROP CONSTRAINT IF EXISTS review_reviewer_id_fkey;
ALTER TABLE IF EXISTS ONLY public.product DROP CONSTRAINT IF EXISTS product_seller_id_fkey;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_buyer_id_fkey;
ALTER TABLE IF EXISTS ONLY public.order_items DROP CONSTRAINT IF EXISTS order_items_product_id_fkey;
ALTER TABLE IF EXISTS ONLY public.order_items DROP CONSTRAINT IF EXISTS order_items_order_id_fkey;
ALTER TABLE IF EXISTS ONLY public.review DROP CONSTRAINT IF EXISTS review_pkey;
ALTER TABLE IF EXISTS ONLY public.profile DROP CONSTRAINT IF EXISTS profile_pkey;
ALTER TABLE IF EXISTS ONLY public.profile DROP CONSTRAINT IF EXISTS profile_email_key;
ALTER TABLE IF EXISTS ONLY public.product DROP CONSTRAINT IF EXISTS product_pkey;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_pkey;
ALTER TABLE IF EXISTS ONLY public.order_items DROP CONSTRAINT IF EXISTS order_items_pkey;
ALTER TABLE IF EXISTS ONLY public.manager DROP CONSTRAINT IF EXISTS manager_pkey;
ALTER TABLE IF EXISTS ONLY public.manager DROP CONSTRAINT IF EXISTS manager_email_key;
DROP TABLE IF EXISTS public.review;
DROP TABLE IF EXISTS public.profile;
DROP TABLE IF EXISTS public.product;
DROP TABLE IF EXISTS public.orders;
DROP TABLE IF EXISTS public.order_items;
DROP TABLE IF EXISTS public.manager;
DROP TYPE IF EXISTS public.shipping_status;
DROP TYPE IF EXISTS public.payment_status;
--
-- Name: payment_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.payment_status AS ENUM (
    'pending',
    'completed',
    'failed'
);


--
-- Name: shipping_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.shipping_status AS ENUM (
    'not_shipped',
    'shipped',
    'delivered'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: manager; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.manager (
                                id integer NOT NULL,
                                name character varying,
                                email character varying,
                                password character varying
);


--
-- Name: manager_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.manager ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.manager_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: order_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_items (
                                    order_id integer NOT NULL,
                                    product_id integer NOT NULL,
                                    quantity integer NOT NULL
);


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
                               id integer NOT NULL,
                               buyer_id integer NOT NULL,
                               payment_status public.payment_status DEFAULT 'pending'::public.payment_status,
                               shipping_status public.shipping_status DEFAULT 'not_shipped'::public.shipping_status,
                               order_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: orders_order_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.orders ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.orders_order_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: product; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product (
                                id integer NOT NULL,
                                seller_id integer NOT NULL,
                                name character varying(255) NOT NULL,
                                description text,
                                price numeric(10,2) NOT NULL,
                                filament_type integer
);


--
-- Name: product_product_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.product ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.product_product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: profile; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profile (
                                id integer NOT NULL,
                                name character varying(255) NOT NULL,
                                email character varying(255) NOT NULL,
                                password character varying(255) NOT NULL,
                                address text,
                                bank_account character varying(255),
                                balance numeric(10,2) DEFAULT 0.00
);


--
-- Name: profile_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.profile ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.profile_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: review; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.review (
                               reviewer_id integer NOT NULL,
                               seller_id integer NOT NULL,
                               rating integer DEFAULT 0 NOT NULL,
                               comment text,
                               review_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
                               CONSTRAINT review_rating_check CHECK (((rating >= 0) AND (rating <= 5)))
);


--
-- Data for Name: manager; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.manager OVERRIDING SYSTEM VALUE VALUES (1, 'John', 'john@mail.com', 'password');


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.order_items VALUES (1, 1, 2);
INSERT INTO public.order_items VALUES (3, 3, 3);
INSERT INTO public.order_items VALUES (1, 5, 3);
INSERT INTO public.order_items VALUES (4, 1, 1);
INSERT INTO public.order_items VALUES (4, 3, 3);
INSERT INTO public.order_items VALUES (1, 3, 3);


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.orders OVERRIDING SYSTEM VALUE VALUES (3, 2, 'completed', 'shipped', '2024-12-19 01:38:23.853');
INSERT INTO public.orders OVERRIDING SYSTEM VALUE VALUES (4, 2, 'completed', 'not_shipped', '2024-12-19 01:38:47.402');
INSERT INTO public.orders OVERRIDING SYSTEM VALUE VALUES (5, 2, 'pending', 'delivered', '2024-12-19 01:39:02.829');
INSERT INTO public.orders OVERRIDING SYSTEM VALUE VALUES (1, 3, 'pending', 'delivered', '2024-12-19 00:46:54.500716');
INSERT INTO public.orders OVERRIDING SYSTEM VALUE VALUES (8, 2, 'completed', 'delivered', '2024-12-20 13:25:39.952');


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.product OVERRIDING SYSTEM VALUE VALUES (1, 9, 'Product 1', 'Super product', 10.00, NULL);
INSERT INTO public.product OVERRIDING SYSTEM VALUE VALUES (3, 9, 'Booster', 'Un super booster a ouvrir', 24.00, 2);
INSERT INTO public.product OVERRIDING SYSTEM VALUE VALUES (4, 3, 'test', 'super', 9.00, NULL);
INSERT INTO public.product OVERRIDING SYSTEM VALUE VALUES (5, 2, 'Carte poke', '5 carte pokemon', 3.00, 2);
INSERT INTO public.product OVERRIDING SYSTEM VALUE VALUES (7, 3, 'Produit numéro 1', NULL, 8.00, NULL);


--
-- Data for Name: profile; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (1, 'Jean', 'jean@mail.com', 'test1234', 'rue du pont', 'BE 999999', 5000.00);
INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (3, 'test', 'poirier@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$0Pvwymi5P+0M5y0Zm8dxVg$4L7eQKbgx0srVOpWCygIaUjzEQ+hq1R6AcC9YtQSbuQ', NULL, NULL, 0.00);
INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (5, 'test2', 'poirierdwad@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$u87G0A/Odoz9VUOaeCH3AQ$BDdC5MDQ1fFa9dp+g63cIKUbyshvnikNk9/98z+2Af8', NULL, 'BE234231', 0.00);
INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (9, 'Seller', 'sell@mail.com', 'dwadaw', NULL, NULL, 0.00);
INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (10, 'Buyer', 'buy@mail.com', 'dwaqwe', NULL, NULL, 0.00);
INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (13, 'Seller Inc.', 'seller@example.com', 'securepassword', '456 Avenue Exemple', 'BE918332987654', 500.00);
INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (14, 'John Doe', 'john.doe@example.com', 'password123', '123 Rue Exemple', 'BE918332123456', 100.00);
INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (2, 'Jean2', 'jean2@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$Egok0BBUrdSsFxEvpxCrVg$y9QExElnEnVWYyU7TUbYuN/DqxGKIUwgB88nMb94Shw', 'rue du ponti', 'BE 999999', 5000.00);
INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (27, 'wadvwadv', 'wadvwadv@dwav.wadv', '$argon2id$v=19$m=65536,t=3,p=4$qAB6dNxi58ozi876m50AAQ$aMeNM5gAiDCRkWR0bV5VM1qps4EPgtqg+5YY4rxQvk8', 'wadvvwad', 'wadvwadv', 222.00);
INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (6, 'test3', 'poirierddawd@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$DMuyW6+rWOaqrLzLy/i/vA$/mCF4FTpFDn35f0qDsP9n1GYlE/XLN3CUEiSMNcHnDA', 'rue du moulin a poivre', 'BE7236ty4622', 230.00);
INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (28, 'Super Seller', 'supseller@mail.com', 'wadvwadvwadvwv', NULL, NULL, 0.00);
INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (29, 'Super Reviewer', 'reviewer@mail.com', 'abcdewadvavd', 'Avenue du chant', NULL, 0.00);
INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (30, 'Super Seller 2', 'supseller22@mail.com', 'dawvwvdva', NULL, NULL, 0.00);
INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (33, 'BUYEDWAVIDWAV', 'dwavdvwava@dvwadvaw.dwavwdva', '$argon2id$v=19$m=65536,t=3,p=4$4sNqSk8ho8MQcWxRImGusA$TfYqmykIDGRpr4DgLPJslTCuk1rbVcZgJXU+vCdRUoc', NULL, NULL, 0.00);
INSERT INTO public.profile OVERRIDING SYSTEM VALUE VALUES (34, 'SELKLER', 'dwavdvwava@dvwadvaw.dwavwdvadwa', '$argon2id$v=19$m=65536,t=3,p=4$KOBXrj+//IK38DZaSqddiA$5d8zX2CpP3+6IfZBM8G1xpejBRCOa/XGa8qyhy1ix+s', NULL, NULL, 0.00);


--
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.review VALUES (1, 9, 3, 'Très bon produit.', '2024-12-18 15:34:43.2');
INSERT INTO public.review VALUES (2, 9, 5, 'excellent bon produit.', '2024-12-19 00:10:14.497');
INSERT INTO public.review VALUES (1, 13, 2, 'davwvwa', '2024-12-20 14:24:55.28');
INSERT INTO public.review VALUES (29, 28, 4, 'Creation seller et reviewer', '2024-12-20 14:26:12.907');
INSERT INTO public.review VALUES (34, 33, 3, 'super top', '2024-12-20 19:22:33.65');


--
-- Name: manager_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.manager_id_seq', 1, true);


--
-- Name: orders_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.orders_order_id_seq', 8, true);


--
-- Name: product_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.product_product_id_seq', 7, true);


--
-- Name: profile_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.profile_user_id_seq', 34, true);


--
-- Name: manager manager_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.manager
    ADD CONSTRAINT manager_email_key UNIQUE (email);


--
-- Name: manager manager_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.manager
    ADD CONSTRAINT manager_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (order_id, product_id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- Name: profile profile_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_email_key UNIQUE (email);


--
-- Name: profile profile_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_pkey PRIMARY KEY (id);


--
-- Name: review review_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (reviewer_id, seller_id);


--
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- Name: order_items order_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: orders orders_buyer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_buyer_id_fkey FOREIGN KEY (buyer_id) REFERENCES public.profile(id);


--
-- Name: product product_seller_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_seller_id_fkey FOREIGN KEY (seller_id) REFERENCES public.profile(id);


--
-- Name: review review_reviewer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_reviewer_id_fkey FOREIGN KEY (reviewer_id) REFERENCES public.profile(id);


--
-- Name: review review_seller_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_seller_id_fkey FOREIGN KEY (seller_id) REFERENCES public.profile(id);


--
-- PostgreSQL database dump complete
--