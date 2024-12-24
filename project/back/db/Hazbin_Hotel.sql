COMMENT ON DATABASE "Hazbin_Hotel"
    IS 'This DB contains information about booking apartments in our hotel.';--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

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
-- Name: Apartments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Apartments" (
    "ID_Apart" integer NOT NULL,
    "Floor" smallint NOT NULL,
    "Number_Of_Apartment" smallint NOT NULL,
    "ID_Ref_Apart_Class" integer NOT NULL
);


ALTER TABLE public."Apartments" OWNER TO postgres;

--
-- Name: TABLE "Apartments"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."Apartments" IS 'Номери готелю';


--
-- Name: Apartments_Classes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Apartments_Classes" (
    "ID_Apart_Class" integer NOT NULL,
    "Name" character varying(255) NOT NULL,
    "Number_Of_Rooms" smallint NOT NULL,
    "Max_Number_Of_Guests" smallint NOT NULL,
    "Price" numeric(10,0) NOT NULL
);


ALTER TABLE public."Apartments_Classes" OWNER TO postgres;

--
-- Name: TABLE "Apartments_Classes"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."Apartments_Classes" IS 'Типи номерів готелю';


--
-- Name: Apartments_Classes_ID_Apart_Class_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Apartments_Classes_ID_Apart_Class_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Apartments_Classes_ID_Apart_Class_seq" OWNER TO postgres;

--
-- Name: Apartments_Classes_ID_Apart_Class_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Apartments_Classes_ID_Apart_Class_seq" OWNED BY public."Apartments_Classes"."ID_Apart_Class";


--
-- Name: Apartments_ID_Apart_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Apartments_ID_Apart_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Apartments_ID_Apart_seq" OWNER TO postgres;

--
-- Name: Apartments_ID_Apart_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Apartments_ID_Apart_seq" OWNED BY public."Apartments"."ID_Apart";


--
-- Name: Booking; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Booking" (
    "ID_Booking" integer NOT NULL,
    "ID_Ref_User" integer NOT NULL,
    "ID_Ref_Apart" integer NOT NULL,
    "Start_Date" date NOT NULL,
    "End_Date" date NOT NULL,
    "Confirmed_Booking" numeric(1,0) DEFAULT 0 NOT NULL,
    "Is_Paid" numeric(1,0) DEFAULT 0 NOT NULL
);


ALTER TABLE public."Booking" OWNER TO postgres;

--
-- Name: TABLE "Booking"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."Bookings" IS 'Список бронювань ';


--
-- Name: Booking_ID_Booking_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Booking_ID_Booking_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Booking_ID_Booking_seq" OWNER TO postgres;

--
-- Name: Booking_ID_Booking_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Booking_ID_Booking_seq" OWNED BY public."Booking"."ID_Booking";


--
-- Name: Guests_ID_Guest_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Guests_ID_Guest_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Guests_ID_Guest_seq" OWNER TO postgres;

--
-- Name: Guests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Guests" (
    "ID_Guest" integer DEFAULT nextval('public."Guests_ID_Guest_seq"'::regclass) NOT NULL,
    "First_Name" character varying(25) NOT NULL,
    "Middle_Name" character varying(25),
    "Last_Name" character varying(25) NOT NULL,
    "Passport_Number" character varying(10) NOT NULL,
    "Passport_Date" date NOT NULL,
    "Phone" character varying(20) NOT NULL,
    "Gender" numeric(1,0) NOT NULL,
    "ID_Ref_User" integer,
    CONSTRAINT "CHK_Guests_Gender" CHECK (("Gender" = ANY (ARRAY[(1)::numeric, (2)::numeric])))
);


ALTER TABLE public."Guests" OWNER TO postgres;

--
-- Name: TABLE "Guests"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."Guests" IS 'Дані про гостей готелю';


--
-- Name: CONSTRAINT "CHK_Guests_Gender" ON "Guests"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON CONSTRAINT "CHK_Guests_Gender" ON public."Guests" IS '1-чоловік; 2-жінка';


--
-- Name: Link_Booking_Guests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Link_Booking_Guests" (
    "ID_Link_BG" integer NOT NULL,
    "ID_Ref_Booking" integer NOT NULL,
    "ID_Ref_Guest" integer NOT NULL
);


ALTER TABLE public."Link_Booking_Guests" OWNER TO postgres;

--
-- Name: TABLE "Link_Booking_Guests"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."Link_Booking_Guests" IS 'Зв’язок між Guests та Bookings';


--
-- Name: Link_Booking_Guests_ID_Link_BG_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Link_Booking_Guests_ID_Link_BG_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Link_Booking_Guests_ID_Link_BG_seq" OWNER TO postgres;

--
-- Name: Link_Booking_Guests_ID_Link_BG_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Link_Booking_Guests_ID_Link_BG_seq" OWNED BY public."Link_Booking_Guests"."ID_Link_BG";


--
-- Name: Users_ID_User_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_ID_User_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Users_ID_User_seq" OWNER TO postgres;

--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    "ID_User" integer DEFAULT nextval('public."Users_ID_User_seq"'::regclass) NOT NULL,
    "First_Name" character varying(25) NOT NULL,
    "Middle_Name" character varying(25),
    "Last_Name" character varying(25) NOT NULL,
    "Email" character varying(30) NOT NULL,
    "Password" character varying(20) NOT NULL,
    "Phone" character varying(20) NOT NULL,
    "Credit_Card_Number" character(16),
    "Blood_Type" character(6),
    "Birthday" date NOT NULL,
    "Gender" numeric(1,0) DEFAULT 1 NOT NULL,
    "ID_Ref_Role" integer NOT NULL,
    CONSTRAINT "CHK_Users_Gender" CHECK (("Gender" = ANY (ARRAY[(1)::numeric, (2)::numeric]))) NO INHERIT
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Name: TABLE "Users"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."Users" IS 'Зареєстровані користувачі сайту готелю';


--
-- Name: CONSTRAINT "CHK_Users_Gender" ON "Users"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON CONSTRAINT "CHK_Users_Gender" ON public."Users" IS '1-чоловік; 2-жінка';


--
-- Name: Users_Roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users_Roles" (
    "ID_Role" integer NOT NULL,
    "Name" character varying(15) NOT NULL
);


ALTER TABLE public."Users_Roles" OWNER TO postgres;

--
-- Name: TABLE "Users_Roles"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."Users_Roles" IS 'Ролі користувачів – адміністратор/користувач';


--
-- Name: Apartments ID_Apart; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Apartments" ALTER COLUMN "ID_Apart" SET DEFAULT nextval('public."Apartments_ID_Apart_seq"'::regclass);


--
-- Name: Apartments_Classes ID_Apart_Class; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Apartments_Classes" ALTER COLUMN "ID_Apart_Class" SET DEFAULT nextval('public."Apartments_Classes_ID_Apart_Class_seq"'::regclass);


--
-- Name: Booking ID_Booking; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Booking" ALTER COLUMN "ID_Booking" SET DEFAULT nextval('public."Booking_ID_Booking_seq"'::regclass);


--
-- Name: Link_Booking_Guests ID_Link_BG; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Link_Booking_Guests" ALTER COLUMN "ID_Link_BG" SET DEFAULT nextval('public."Link_Booking_Guests_ID_Link_BG_seq"'::regclass);


--
-- Data for Name: Apartments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Apartments" ("ID_Apart", "Floor", "Number_Of_Apartment", "ID_Ref_Apart_Class") FROM stdin;
\.


--
-- Data for Name: Apartments_Classes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Apartments_Classes" ("ID_Apart_Class", "Name", "Number_Of_Rooms", "Max_Number_Of_Guests", "Price") FROM stdin;
\.


--
-- Data for Name: Booking; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Booking" ("ID_Booking", "ID_Ref_User", "ID_Ref_Apart", "Start_Date", "End_Date", "Confirmed_Booking", "Is_Paid") FROM stdin;
\.


--
-- Data for Name: Guests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Guests" ("ID_Guest", "First_Name", "Middle_Name", "Last_Name", "Passport_Number", "Passport_Date", "Phone", "Gender", "ID_Ref_User") FROM stdin;
\.


--
-- Data for Name: Link_Booking_Guests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Link_Booking_Guests" ("ID_Link_BG", "ID_Ref_Booking", "ID_Ref_Guest") FROM stdin;
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" ("ID_User", "First_Name", "Middle_Name", "Last_Name", "Email", "Password", "Phone", "Credit_Card_Number", "Blood_Type", "Birthday", "Gender", "ID_Ref_Role") FROM stdin;
\.


--
-- Data for Name: Users_Roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users_Roles" ("ID_Role", "Name") FROM stdin;
1	Адміністратор
2	Користувач
\.


--
-- Name: Apartments_Classes_ID_Apart_Class_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Apartments_Classes_ID_Apart_Class_seq"', 1, true);


--
-- Name: Apartments_ID_Apart_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Apartments_ID_Apart_seq"', 1, false);


--
-- Name: Booking_ID_Booking_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Booking_ID_Booking_seq"', 1, false);


--
-- Name: Guests_ID_Guest_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Guests_ID_Guest_seq"', 1, false);


--
-- Name: Link_Booking_Guests_ID_Link_BG_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Link_Booking_Guests_ID_Link_BG_seq"', 1, false);


--
-- Name: Users_ID_User_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_ID_User_seq"', 1, false);


--
-- Name: Apartments_Classes Apartments_Classes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Apartments_Classes"
    ADD CONSTRAINT "Apartments_Classes_pkey" PRIMARY KEY ("ID_Apart_Class");


--
-- Name: Apartments Apartments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Apartments"
    ADD CONSTRAINT "Apartments_pkey" PRIMARY KEY ("ID_Apart");


--
-- Name: Booking Booking_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_pkey" PRIMARY KEY ("ID_Booking");


--
-- Name: Booking CHK_Confirmed; Type: CHECK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE public."Booking"
    ADD CONSTRAINT "CHK_Confirmed" CHECK (("Confirmed_Booking" = ANY (ARRAY[(1)::numeric, (0)::numeric]))) NOT VALID;


--
-- Name: CONSTRAINT "CHK_Confirmed" ON "Booking"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON CONSTRAINT "CHK_Confirmed" ON public."Booking" IS '1 - підтверджено
0 - не підтверджено';


--
-- Name: Booking CHK_Dates; Type: CHECK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE public."Booking"
    ADD CONSTRAINT "CHK_Dates" CHECK (("Start_Date" <= "End_Date")) NOT VALID;


--
-- Name: Booking CHK_Is_Paid; Type: CHECK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE public."Booking"
    ADD CONSTRAINT "CHK_Is_Paid" CHECK (("Is_Paid" = ANY (ARRAY[(1)::numeric, (0)::numeric]))) NOT VALID;


--
-- Name: CONSTRAINT "CHK_Is_Paid" ON "Booking"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON CONSTRAINT "CHK_Is_Paid" ON public."Booking" IS '1 - сплачено
0 - не сплачено';


--
-- Name: Guests Guests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_pkey" PRIMARY KEY ("ID_Guest");


--
-- Name: Link_Booking_Guests Link_Booking_Guests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Link_Booking_Guests"
    ADD CONSTRAINT "Link_Booking_Guests_pkey" PRIMARY KEY ("ID_Link_BG");


--
-- Name: Apartments UNQ_Apartments_Number; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Apartments"
    ADD CONSTRAINT "UNQ_Apartments_Number" UNIQUE ("Number_Of_Apartment");


--
-- Name: Users UNQ_Email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "UNQ_Email" UNIQUE ("Email");


--
-- Name: Users_Roles Users_Roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users_Roles"
    ADD CONSTRAINT "Users_Roles_pkey" PRIMARY KEY ("ID_Role");


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("ID_User");


--
-- Name: Apartments FK_Apartments_Class; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Apartments"
    ADD CONSTRAINT "FK_Apartments_Class" FOREIGN KEY ("ID_Ref_Apart_Class") REFERENCES public."Apartments_Classes"("ID_Apart_Class") NOT VALID;


--
-- Name: Guests FK_Guests_User; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "FK_Guests_User" FOREIGN KEY ("ID_Ref_User") REFERENCES public."Users"("ID_User") NOT VALID;


--
-- Name: Link_Booking_Guests FK_Link_Booking; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Link_Booking_Guests"
    ADD CONSTRAINT "FK_Link_Booking" FOREIGN KEY ("ID_Ref_Booking") REFERENCES public."Booking"("ID_Booking") NOT VALID;


--
-- Name: Link_Booking_Guests FK_Link_Guests; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Link_Booking_Guests"
    ADD CONSTRAINT "FK_Link_Guests" FOREIGN KEY ("ID_Ref_Guest") REFERENCES public."Guests"("ID_Guest") NOT VALID;


--
-- Name: Users FK_Users_Role; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "FK_Users_Role" FOREIGN KEY ("ID_Ref_Role") REFERENCES public."Users_Roles"("ID_Role") NOT VALID;


--
-- PostgreSQL database dump complete
--

