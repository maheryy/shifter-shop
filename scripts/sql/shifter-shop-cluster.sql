--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:L+AvEeRZhodeoK3qmJXkQQ==$mSZhrsHTczOWgHnZVXBK/BJmk1HRXc7jKJQcs1mnpFg=:G0zgjroJBi/jNsjMINGBvASeX61sUYFrEuItWIoPzXI=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Debian 15.1-1.pgdg110+1)
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

--
-- Database "cart" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Debian 15.1-1.pgdg110+1)
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: cart; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE cart WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE cart OWNER TO postgres;

\connect cart

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cart_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_item (
    "productId" uuid NOT NULL,
    "customerId" uuid NOT NULL,
    quantity integer NOT NULL,
    date timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.cart_item OWNER TO postgres;

--
-- Data for Name: cart_item; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Name: cart_item PK_4c8960b150147764200b083ec8b; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT "PK_4c8960b150147764200b083ec8b" PRIMARY KEY ("productId", "customerId");


--
-- PostgreSQL database dump complete
--

--
-- Database "categories" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Debian 15.1-1.pgdg110+1)
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: categories; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE categories WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE categories OWNER TO postgres;

\connect categories

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    description character varying
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.category (id, name, description) VALUES ('179d8c65-bb9d-49e9-9caf-d3eaef902821', 'Account', 'Et enim quae et rerum incidunt ut occaecati nulla fugiat.');
INSERT INTO public.category (id, name, description) VALUES ('717be8e0-7b80-44d8-a049-b172dce871b1', 'Expanded', 'Atque at veniam rerum omnis in qui temporibus.');
INSERT INTO public.category (id, name, description) VALUES ('9bdf3d81-7399-4ac5-a065-aa5805952616', 'Handmade', 'Ducimus nostrum rerum est illo hic quaerat molestiae incidunt.');
INSERT INTO public.category (id, name, description) VALUES ('6db06bd7-d3f3-4dcf-9480-722a6920a397', 'Markets', 'Dolore quod qui eligendi.');
INSERT INTO public.category (id, name, description) VALUES ('321717ce-fd25-4e54-beb2-d9d09abb98f0', 'Copy', 'Nobis distinctio voluptas quos quae nihil aut ex dolor.');
INSERT INTO public.category (id, name, description) VALUES ('49ebf35d-2061-4dab-8f91-393da78b429c', 'Holistic', 'Voluptas ex quo voluptas vitae vel sunt dolorem sapiente ut.');


--
-- Name: category PK_9c4e4a89e3674fc9f382d733f03; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY (id);


--
-- Name: category UQ_23c05c292c439d77b0de816b500; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE (name);


--
-- PostgreSQL database dump complete
--

--
-- Database "inventory" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Debian 15.1-1.pgdg110+1)
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: inventory; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE inventory WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE inventory OWNER TO postgres;

\connect inventory

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: inventory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inventory (
    "productId" uuid NOT NULL,
    "initialQuantity" integer NOT NULL,
    quantity integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.inventory OWNER TO postgres;

--
-- Data for Name: inventory; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Name: inventory PK_c8622e1e24c6d054d36e8824490; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT "PK_c8622e1e24c6d054d36e8824490" PRIMARY KEY ("productId");


--
-- PostgreSQL database dump complete
--

--
-- Database "orders" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Debian 15.1-1.pgdg110+1)
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: orders; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE orders WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE orders OWNER TO postgres;

\connect orders

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: order_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.order_status_enum AS ENUM (
    'Pending',
    'Confirmed',
    'Shipping',
    'Delivered',
    'Cancelled'
);


ALTER TYPE public.order_status_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."order" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "customerId" uuid NOT NULL,
    reference character(10) NOT NULL,
    amount double precision NOT NULL,
    products jsonb NOT NULL,
    status public.order_status_enum DEFAULT 'Pending'::public.order_status_enum NOT NULL,
    date timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."order" OWNER TO postgres;

--
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."order" (id, "customerId", reference, amount, products, status, date) VALUES ('680fddc4-30af-402b-9c86-aebdde984ab1', '9bf43ed2-5fa5-4036-a450-56725361cdea', 'AX0HD4M6Z1', 2565.4, '[{"id": "da76bb4a-1897-448b-85fb-27877a7f1c84", "quantity": 4}, {"id": "4dee711f-fee4-473f-a951-48f41dfea399", "quantity": 4}]', 'Confirmed', '2023-07-01 00:00:00.718+00');
INSERT INTO public."order" (id, "customerId", reference, amount, products, status, date) VALUES ('85d2e0e4-7f14-4e27-b512-c42419d1dfb3', '9bf43ed2-5fa5-4036-a450-56725361cdea', 'BX0HD4M6Z2', 2565.4, '[{"id": "da76bb4a-1897-448b-85fb-27877a7f1c84", "quantity": 4}, {"id": "4dee711f-fee4-473f-a951-48f41dfea399", "quantity": 4}]', 'Delivered', '2023-05-02 00:00:00.718+00');
INSERT INTO public."order" (id, "customerId", reference, amount, products, status, date) VALUES ('eeec9372-36ee-4294-ad1e-6f6dccc080a0', '9bf43ed2-5fa5-4036-a450-56725361cdea', 'CX0HD4M6Z3', 2565.4, '[{"id": "da76bb4a-1897-448b-85fb-27877a7f1c84", "quantity": 4}, {"id": "4dee711f-fee4-473f-a951-48f41dfea399", "quantity": 4}]', 'Confirmed', '2023-06-04 00:00:00.718+00');
INSERT INTO public."order" (id, "customerId", reference, amount, products, status, date) VALUES ('9e35818b-d3db-4a71-8806-3556a82b36bd', '9bf43ed2-5fa5-4036-a450-56725361cdea', 'DX0HD4M6Z4', 2565.4, '[{"id": "da76bb4a-1897-448b-85fb-27877a7f1c84", "quantity": 4}, {"id": "4dee711f-fee4-473f-a951-48f41dfea399", "quantity": 4}]', 'Delivered', '2023-05-04 00:00:00.718+00');
INSERT INTO public."order" (id, "customerId", reference, amount, products, status, date) VALUES ('23295b0a-b64f-4e03-a261-097c0702a212', '9bf43ed2-5fa5-4036-a450-56725361cdea', 'EX0HD4M6Z5', 2565.4, '[{"id": "da76bb4a-1897-448b-85fb-27877a7f1c84", "quantity": 4}, {"id": "4dee711f-fee4-473f-a951-48f41dfea399", "quantity": 4}]', 'Shipping', '2023-06-02 00:00:00.718+00');
INSERT INTO public."order" (id, "customerId", reference, amount, products, status, date) VALUES ('4d5e2e70-56aa-4304-a3c3-cd562a3a5c11', '9bf43ed2-5fa5-4036-a450-56725361cdea', 'FX0HD4M6Z6', 2565.4, '[{"id": "da76bb4a-1897-448b-85fb-27877a7f1c84", "quantity": 4}, {"id": "4dee711f-fee4-473f-a951-48f41dfea399", "quantity": 4}]', 'Shipping', '2023-06-06 00:00:00.718+00');
INSERT INTO public."order" (id, "customerId", reference, amount, products, status, date) VALUES ('a3fb8c95-a351-4efa-88b3-d241f7af6e88', '9bf43ed2-5fa5-4036-a450-56725361cdea', 'GX0HD4M6Z7', 2565.4, '[{"id": "da76bb4a-1897-448b-85fb-27877a7f1c84", "quantity": 4}, {"id": "4dee711f-fee4-473f-a951-48f41dfea399", "quantity": 4}]', 'Delivered', '2023-06-04 00:00:00.718+00');


--
-- Name: order PK_1031171c13130102495201e3e20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY (id);


--
-- Name: order UQ_a698ce5a132a8d2ed4be89d8fd8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "UQ_a698ce5a132a8d2ed4be89d8fd8" UNIQUE (reference);


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Debian 15.1-1.pgdg110+1)
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

--
-- Database "products" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Debian 15.1-1.pgdg110+1)
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: products; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE products WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE products OWNER TO postgres;

\connect products

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: product_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.product_status_enum AS ENUM (
    'ACTIVE',
    'DEFAULT',
    'DELETED'
);


ALTER TYPE public.product_status_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    rating double precision DEFAULT '0'::double precision NOT NULL,
    price double precision NOT NULL,
    image character varying NOT NULL,
    "categoryId" uuid NOT NULL,
    "sellerId" uuid NOT NULL,
    status public.product_status_enum DEFAULT 'DEFAULT'::public.product_status_enum NOT NULL
);


ALTER TABLE public.product OWNER TO postgres;

--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.product (id, name, description, rating, price, image, "categoryId", "sellerId", status) VALUES ('b5504f11-96f0-4f68-8e8b-05a58c0c2353', 'Intelligent Soft Hat', 'Sint vero et magni. Facere ipsum doloribus perspiciatis qui exercitationem repudiandae.', 0, 424.7, 'https://picsum.photos/200', '321717ce-fd25-4e54-beb2-d9d09abb98f0', 'bb208508-fba5-4fd4-8f50-24e4da273c0e', 'DEFAULT');
INSERT INTO public.product (id, name, description, rating, price, image, "categoryId", "sellerId", status) VALUES ('7654b4ad-8a43-42f7-93d0-939b6661ba86', 'Licensed Cotton Soap', 'Esse ullam id quisquam consequatur est et. At ipsam officiis nobis quaerat saepe officia. Placeat omnis commodi omnis. Laborum facere sapiente. Earum recusandae dolor dolor quo atque voluptatibus et. Rerum temporibus aut aut optio.', 0, 49.96, 'https://picsum.photos/200', '9bdf3d81-7399-4ac5-a065-aa5805952616', 'bb208508-fba5-4fd4-8f50-24e4da273c0e', 'DEFAULT');
INSERT INTO public.product (id, name, description, rating, price, image, "categoryId", "sellerId", status) VALUES ('83f26252-4930-4f21-aab5-c836e4f8f820', 'Intelligent Metal Hat', 'Eius quia earum ad. Voluptate rem accusamus eum omnis est consequuntur explicabo eos. Corporis expedita et labore inventore illum id vel. Omnis similique mollitia eum.', 0, 467.34, 'https://picsum.photos/200', '6db06bd7-d3f3-4dcf-9480-722a6920a397', 'f3b538a1-ca10-44d3-aa3e-96fe6e31b8f3', 'DEFAULT');
INSERT INTO public.product (id, name, description, rating, price, image, "categoryId", "sellerId", status) VALUES ('ecb4d3db-be27-4e1d-81c0-5d812d01dcfb', 'Small Soft Cheese', 'Laboriosam id fugit. Quo vero dolor vel ut.', 0, 152.82, 'https://picsum.photos/200', '717be8e0-7b80-44d8-a049-b172dce871b1', 'bb208508-fba5-4fd4-8f50-24e4da273c0e', 'DEFAULT');
INSERT INTO public.product (id, name, description, rating, price, image, "categoryId", "sellerId", status) VALUES ('4a34aaa8-2b54-495c-a13d-79dba820d23e', 'Unbranded Rubber Keyboard', 'Vel ut et occaecati id deserunt. Illum et eveniet unde non tempora quo unde. Qui vitae minima autem.', 0, 944.01, 'https://picsum.photos/200', '49ebf35d-2061-4dab-8f91-393da78b429c', 'bb208508-fba5-4fd4-8f50-24e4da273c0e', 'DEFAULT');
INSERT INTO public.product (id, name, description, rating, price, image, "categoryId", "sellerId", status) VALUES ('e769c944-5746-423b-80b7-5d5bdfa4983b', 'Refined Plastic Pizza', 'Repellendus minima voluptatem eveniet ut vero. Qui corrupti qui.', 0, 18.51, 'https://picsum.photos/200', '179d8c65-bb9d-49e9-9caf-d3eaef902821', 'bb208508-fba5-4fd4-8f50-24e4da273c0e', 'DEFAULT');
INSERT INTO public.product (id, name, description, rating, price, image, "categoryId", "sellerId", status) VALUES ('f86885a4-83e8-489f-a23b-d4d57ade5f1e', 'Generic Frozen Mouse', 'Dignissimos asperiores nihil eveniet quam consequatur officiis. Repellat ut praesentium aut suscipit adipisci distinctio laboriosam vitae eos. Necessitatibus asperiores sit ut alias ut ullam in rem. Eum a voluptatem molestias quidem blanditiis nihil quas ullam aperiam.', 0, 777.66, 'https://picsum.photos/200', '49ebf35d-2061-4dab-8f91-393da78b429c', 'bb208508-fba5-4fd4-8f50-24e4da273c0e', 'DEFAULT');
INSERT INTO public.product (id, name, description, rating, price, image, "categoryId", "sellerId", status) VALUES ('c75b7be0-05fa-42e8-963b-81e3d5178ded', 'Handcrafted Plastic Ball', 'Omnis a deserunt voluptas nobis eaque est. Porro vel quam dolorum officia quam non et accusantium doloremque.', 0, 288.33, 'https://picsum.photos/200', '49ebf35d-2061-4dab-8f91-393da78b429c', 'bb208508-fba5-4fd4-8f50-24e4da273c0e', 'DEFAULT');
INSERT INTO public.product (id, name, description, rating, price, image, "categoryId", "sellerId", status) VALUES ('4dee711f-fee4-473f-a951-48f41dfea399', 'Handmade Granite Soap', 'Amet itaque pariatur illo ab est. Aperiam exercitationem aut reprehenderit laborum facilis qui incidunt qui assumenda.', 2.6, 191.56, 'https://picsum.photos/200', '49ebf35d-2061-4dab-8f91-393da78b429c', 'bb208508-fba5-4fd4-8f50-24e4da273c0e', 'DEFAULT');
INSERT INTO public.product (id, name, description, rating, price, image, "categoryId", "sellerId", status) VALUES ('74190c72-f9f5-48cf-8921-22c4795b038e', 'Handmade Rubber Table', 'Aut dolorem ut. Soluta recusandae quia saepe. Aliquid eius mollitia veniam assumenda et non laudantium dolorem. Numquam ducimus consequatur. Eius eos perferendis quisquam a incidunt sunt. Non rem ea.', 0, 986.65, 'https://picsum.photos/200', '179d8c65-bb9d-49e9-9caf-d3eaef902821', 'bb208508-fba5-4fd4-8f50-24e4da273c0e', 'DEFAULT');
INSERT INTO public.product (id, name, description, rating, price, image, "categoryId", "sellerId", status) VALUES ('da76bb4a-1897-448b-85fb-27877a7f1c84', 'Small Frozen Shirt', 'Qui voluptas ea. Harum deserunt odit. Est et consequuntur quis quae.', 3, 449.79, 'https://picsum.photos/200', '321717ce-fd25-4e54-beb2-d9d09abb98f0', 'f3b538a1-ca10-44d3-aa3e-96fe6e31b8f3', 'DEFAULT');
INSERT INTO public.product (id, name, description, rating, price, image, "categoryId", "sellerId", status) VALUES ('6f267dbb-ae76-4548-b488-9325eebfc784', 'Fantastic Fresh Chair', 'Eius totam tempore numquam excepturi corrupti magni. Architecto fugiat ducimus impedit et voluptate tempora. Neque enim et enim aut iusto corporis pariatur. Vitae odit vel beatae ullam. Ut pariatur molestias ullam et magnam ea saepe ut. Dolores praesentium dolores.', 0, 862.33, 'https://picsum.photos/200', '9bdf3d81-7399-4ac5-a065-aa5805952616', 'bb208508-fba5-4fd4-8f50-24e4da273c0e', 'DEFAULT');
INSERT INTO public.product (id, name, description, rating, price, image, "categoryId", "sellerId", status) VALUES ('bcd60c46-0b8c-40f3-95ee-0b57febc31fb', 'Generic Metal Bike', 'Necessitatibus animi voluptatem occaecati aliquam iusto voluptatem. Ab sed et est. Dolorem placeat explicabo. Tempora ipsum totam.', 0, 764.85, 'https://picsum.photos/200', '717be8e0-7b80-44d8-a049-b172dce871b1', 'bb208508-fba5-4fd4-8f50-24e4da273c0e', 'DEFAULT');
INSERT INTO public.product (id, name, description, rating, price, image, "categoryId", "sellerId", status) VALUES ('a378688f-99dd-4cd8-a788-2bffb0435bf3', 'Ergonomic Plastic Bacon', 'Iure maiores dolorem doloremque voluptas esse. Et dolorem officia aut.', 0, 374.67, 'https://picsum.photos/200', '321717ce-fd25-4e54-beb2-d9d09abb98f0', 'f3b538a1-ca10-44d3-aa3e-96fe6e31b8f3', 'DEFAULT');
INSERT INTO public.product (id, name, description, rating, price, image, "categoryId", "sellerId", status) VALUES ('80e0a41b-e8f3-4770-8e19-579ffcb2370a', 'Generic Granite Computer', 'Sunt rerum provident odit rem ratione. Veniam ab eius officiis ipsa quis recusandae aut modi iste.', 0, 905.29, 'https://picsum.photos/200', '49ebf35d-2061-4dab-8f91-393da78b429c', 'f3b538a1-ca10-44d3-aa3e-96fe6e31b8f3', 'DEFAULT');
INSERT INTO public.product (id, name, description, rating, price, image, "categoryId", "sellerId", status) VALUES ('0f62bf46-d8d8-4698-8e40-3f91e5216a3c', 'Gorgeous Granite Table', 'Possimus molestiae unde nemo a. Exercitationem laborum itaque magni in corporis consectetur quia. Et consequuntur impedit debitis saepe recusandae nihil suscipit. Dolores eum voluptas recusandae officiis sequi totam.', 0, 367.34, 'https://picsum.photos/200', '321717ce-fd25-4e54-beb2-d9d09abb98f0', 'f3b538a1-ca10-44d3-aa3e-96fe6e31b8f3', 'DEFAULT');
INSERT INTO public.product (id, name, description, rating, price, image, "categoryId", "sellerId", status) VALUES ('1bb542ed-07c5-4ab1-881d-2930a365a899', 'Refined Rubber Pants', 'Ea et dolor repellat. Illum tenetur accusamus similique dolores.', 0, 825.92, 'https://picsum.photos/200', '9bdf3d81-7399-4ac5-a065-aa5805952616', 'bb208508-fba5-4fd4-8f50-24e4da273c0e', 'DEFAULT');
INSERT INTO public.product (id, name, description, rating, price, image, "categoryId", "sellerId", status) VALUES ('9ac0703e-acce-4cd3-90cb-6bd661af308f', 'Handcrafted Frozen Pants', 'Voluptatum voluptates sit officia. Tempora a aut eveniet possimus similique nihil fugit sit. Consectetur aut atque dolorem beatae itaque. Sunt consequuntur nam est esse veritatis.', 0, 871.47, 'https://picsum.photos/200', '6db06bd7-d3f3-4dcf-9480-722a6920a397', 'f3b538a1-ca10-44d3-aa3e-96fe6e31b8f3', 'DEFAULT');
INSERT INTO public.product (id, name, description, rating, price, image, "categoryId", "sellerId", status) VALUES ('19256edb-11c6-4ae6-9ebd-14f5bc6809da', 'Small Frozen Pants', 'Ut quia tenetur sunt iste enim. Nemo qui fuga. Rem voluptatem officiis quidem aut alias. Sed rem nesciunt sequi. Tempora placeat eius esse.', 0, 672.13, 'https://picsum.photos/200', '321717ce-fd25-4e54-beb2-d9d09abb98f0', 'f3b538a1-ca10-44d3-aa3e-96fe6e31b8f3', 'DEFAULT');
INSERT INTO public.product (id, name, description, rating, price, image, "categoryId", "sellerId", status) VALUES ('93509ffe-69da-4bc6-a7c4-b5661541069b', 'Generic Wooden Fish', 'Soluta qui voluptas nisi. Quo aliquam eos ut aut aut sapiente. Consequuntur est vitae aut reiciendis vel quos laborum.', 0, 896.43, 'https://picsum.photos/200', '321717ce-fd25-4e54-beb2-d9d09abb98f0', 'f3b538a1-ca10-44d3-aa3e-96fe6e31b8f3', 'DEFAULT');


--
-- Name: product PK_bebc9158e480b949565b4dc7a82; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

--
-- Database "profiles" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Debian 15.1-1.pgdg110+1)
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: profiles; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE profiles WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE profiles OWNER TO postgres;

\connect profiles

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: business_request_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.business_request_status_enum AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED'
);


ALTER TYPE public.business_request_status_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: address; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.address (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "fullName" character varying NOT NULL,
    address1 character varying NOT NULL,
    address2 character varying,
    city character varying NOT NULL,
    zip character varying NOT NULL,
    province character varying NOT NULL,
    phone character varying NOT NULL,
    "isDefault" boolean DEFAULT false NOT NULL,
    "profileId" uuid
);


ALTER TABLE public.address OWNER TO postgres;

--
-- Name: business_profile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.business_profile (
    id uuid NOT NULL,
    company character varying NOT NULL,
    website character varying,
    phone character varying,
    address character varying NOT NULL,
    city character varying NOT NULL,
    country character varying NOT NULL,
    zip character varying NOT NULL
);


ALTER TABLE public.business_profile OWNER TO postgres;

--
-- Name: business_request; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.business_request (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "customerId" uuid NOT NULL,
    title character varying NOT NULL,
    description character varying NOT NULL,
    date timestamp with time zone DEFAULT now() NOT NULL,
    status public.business_request_status_enum DEFAULT 'PENDING'::public.business_request_status_enum NOT NULL
);


ALTER TABLE public.business_request OWNER TO postgres;

--
-- Name: customer_profile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customer_profile (
    id uuid NOT NULL,
    phone character varying
);


ALTER TABLE public.customer_profile OWNER TO postgres;

--
-- Data for Name: address; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: business_profile; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: business_request; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: customer_profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.customer_profile (id, phone) VALUES ('bb208508-fba5-4fd4-8f50-24e4da273c0e', NULL);
INSERT INTO public.customer_profile (id, phone) VALUES ('f3b538a1-ca10-44d3-aa3e-96fe6e31b8f3', NULL);
INSERT INTO public.customer_profile (id, phone) VALUES ('9bf43ed2-5fa5-4036-a450-56725361cdea', NULL);


--
-- Name: business_request PK_42e44b9d028789ae69bead23999; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.business_request
    ADD CONSTRAINT "PK_42e44b9d028789ae69bead23999" PRIMARY KEY (id);


--
-- Name: customer_profile PK_d3e8a37b75a6e92258188f59403; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer_profile
    ADD CONSTRAINT "PK_d3e8a37b75a6e92258188f59403" PRIMARY KEY (id);


--
-- Name: address PK_d92de1f82754668b5f5f5dd4fd5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY (id);


--
-- Name: business_profile PK_e71e197c467c1ec2c45a1652110; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.business_profile
    ADD CONSTRAINT "PK_e71e197c467c1ec2c45a1652110" PRIMARY KEY (id);


--
-- Name: business_request UQ_c6b2539fb6cb2d7846f2bb335a7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.business_request
    ADD CONSTRAINT "UQ_c6b2539fb6cb2d7846f2bb335a7" UNIQUE ("customerId");


--
-- Name: address FK_d037a6704e2acea2438d9ab218b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT "FK_d037a6704e2acea2438d9ab218b" FOREIGN KEY ("profileId") REFERENCES public.customer_profile(id);


--
-- PostgreSQL database dump complete
--

--
-- Database "reviews" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Debian 15.1-1.pgdg110+1)
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: reviews; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE reviews WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE reviews OWNER TO postgres;

\connect reviews

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: review_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.review_status_enum AS ENUM (
    'ACTIVE',
    'DEFAULT',
    'DELETED'
);


ALTER TYPE public.review_status_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.review (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying,
    details character varying,
    rating double precision NOT NULL,
    "productId" uuid NOT NULL,
    "orderId" uuid NOT NULL,
    "authorId" uuid NOT NULL,
    status public.review_status_enum DEFAULT 'DEFAULT'::public.review_status_enum NOT NULL,
    date timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.review OWNER TO postgres;

--
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.review (id, title, details, rating, "productId", "orderId", "authorId", status, date) VALUES ('836837a0-80e1-4f3c-973d-2f69112da512', 'haptic', 'Ut modi quaerat non placeat maxime qui saepe. Esse quos atque possimus quam maiores autem alias voluptatem dolorum. Numquam minima temporibus similique quia eos tenetur. Accusantium et tempora exercitationem dolores qui aut qui porro. Aut quia consequuntur saepe modi quaerat ipsum blanditiis error quos.', 2, '4dee711f-fee4-473f-a951-48f41dfea399', '9e35818b-d3db-4a71-8806-3556a82b36bd', '9bf43ed2-5fa5-4036-a450-56725361cdea', 'DEFAULT', '2023-06-25 00:00:00.234+00');
INSERT INTO public.review (id, title, details, rating, "productId", "orderId", "authorId", status, date) VALUES ('d1402047-e35a-4fc1-a15e-94a5acd4a524', 'wireless', 'Aut consequuntur et deserunt. Enim accusantium commodi. Sunt qui veritatis sed quae culpa mollitia est earum quasi. Necessitatibus exercitationem saepe ullam dolor delectus omnis possimus assumenda. Aut dicta officiis eum totam ipsa.', 3, 'da76bb4a-1897-448b-85fb-27877a7f1c84', '9e35818b-d3db-4a71-8806-3556a82b36bd', '9bf43ed2-5fa5-4036-a450-56725361cdea', 'DEFAULT', '2023-06-25 00:00:00.234+00');
INSERT INTO public.review (id, title, details, rating, "productId", "orderId", "authorId", status, date) VALUES ('6d3e2b1c-1848-4281-9e0c-04fe2c1ca1e4', 'lit', 'Ut modi quaerat non placeat maxime qui saepe. Esse quos atque possimus quam maiores autem alias voluptatem dolorum. Numquam minima temporibus similique quia eos tenetur. Accusantium et tempora exercitationem dolores qui aut qui porro. Aut quia consequuntur saepe modi quaerat ipsum blanditiis error quos.', 5, '4dee711f-fee4-473f-a951-48f41dfea399', '85d2e0e4-7f14-4e27-b512-c42419d1dfb3', '9bf43ed2-5fa5-4036-a450-56725361cdea', 'DEFAULT', '2023-06-25 00:00:00.234+00');
INSERT INTO public.review (id, title, details, rating, "productId", "orderId", "authorId", status, date) VALUES ('1c505d79-ad08-46b9-9339-9778d7cd16a4', 'good', 'Aut consequuntur et deserunt. Enim accusantium commodi. Sunt qui veritatis sed quae culpa mollitia est earum quasi. Necessitatibus exercitationem saepe ullam dolor delectus omnis possimus assumenda. Aut dicta officiis eum totam ipsa.', 3, 'da76bb4a-1897-448b-85fb-27877a7f1c84', '85d2e0e4-7f14-4e27-b512-c42419d1dfb3', '9bf43ed2-5fa5-4036-a450-56725361cdea', 'DEFAULT', '2023-06-25 00:00:00.234+00');
INSERT INTO public.review (id, title, details, rating, "productId", "orderId", "authorId", status, date) VALUES ('7731681d-9ce4-4910-8230-1d7e220b4649', 'bad', 'Ut modi quaerat non placeat maxime qui saepe. Esse quos atque possimus quam maiores autem alias voluptatem dolorum. Numquam minima temporibus similique quia eos tenetur. Accusantium et tempora exercitationem dolores qui aut qui porro. Aut quia consequuntur saepe modi quaerat ipsum blanditiis error quos.', 1, '4dee711f-fee4-473f-a951-48f41dfea399', 'a3fb8c95-a351-4efa-88b3-d241f7af6e88', '9bf43ed2-5fa5-4036-a450-56725361cdea', 'DEFAULT', '2023-06-25 00:00:00.234+00');
INSERT INTO public.review (id, title, details, rating, "productId", "orderId", "authorId", status, date) VALUES ('07e0309b-85e6-4fe8-b09d-161669c9041a', 'sensible', 'Aut consequuntur et deserunt. Enim accusantium commodi. Sunt qui veritatis sed quae culpa mollitia est earum quasi. Necessitatibus exercitationem saepe ullam dolor delectus omnis possimus assumenda. Aut dicta officiis eum totam ipsa.', 3, 'da76bb4a-1897-448b-85fb-27877a7f1c84', 'a3fb8c95-a351-4efa-88b3-d241f7af6e88', '9bf43ed2-5fa5-4036-a450-56725361cdea', 'DEFAULT', '2023-06-25 00:00:00.234+00');


--
-- Name: review PK_2e4299a343a81574217255c00ca; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

--
-- Database "users" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Debian 15.1-1.pgdg110+1)
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: users; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE users WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE users OWNER TO postgres;

\connect users

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: user_role_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_role_enum AS ENUM (
    'ADMIN',
    'CUSTOMER',
    'SELLER'
);


ALTER TYPE public.user_role_enum OWNER TO postgres;

--
-- Name: user_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_status_enum AS ENUM (
    'ACTIVE',
    'DEFAULT',
    'DELETED'
);


ALTER TYPE public.user_status_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying NOT NULL,
    firstname character varying NOT NULL,
    lastname character varying NOT NULL,
    password character varying NOT NULL,
    role public.user_role_enum DEFAULT 'CUSTOMER'::public.user_role_enum NOT NULL,
    status public.user_status_enum DEFAULT 'DEFAULT'::public.user_status_enum NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."user" (id, email, firstname, lastname, password, role, status) VALUES ('9bf43ed2-5fa5-4036-a450-56725361cdea', 'customer@demo.com', 'Julia', 'Suza', '$2b$10$CZHr16CdZMU0c24.aq3F8ep/oU44RqrpsR0iWfTWHio2DVuKNjoTi', 'CUSTOMER', 'DEFAULT');
INSERT INTO public."user" (id, email, firstname, lastname, password, role, status) VALUES ('f3b538a1-ca10-44d3-aa3e-96fe6e31b8f3', 'seller@demo.com', 'Davis', 'Cooper', '$2b$10$c5bNguUoZScBwQPlNNaVZuhhG66irrxax3TMEeRzWEyZH31I72dW6', 'SELLER', 'DEFAULT');
INSERT INTO public."user" (id, email, firstname, lastname, password, role, status) VALUES ('bb208508-fba5-4fd4-8f50-24e4da273c0e', 'admin@demo.com', 'Bossy', 'Bazz', '$2b$10$uIIXFx0UHmscbW.PebzjhuEtiLDnIQi.vEuE0YswQZrHlMin47gOi', 'ADMIN', 'DEFAULT');


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

