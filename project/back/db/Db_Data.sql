--
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

--
-- Data for Name: Apartments_Classes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Apartments_Classes" ("ID_Apart_Class", "Name", "Number_Of_Rooms", "Max_Number_Of_Guests", "Price") FROM stdin;
2	Single	1	1	500
3	Double	1	2	700
4	President Suite	1	2	4000
5	Connecting	2	4	2000
6	Deluxe single	1	1	1300
7	Deluxe double	1	2	2000
\.


--
-- Data for Name: Apartments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Apartments" ("ID_Apart", "Floor", "Number_Of_Apartment", "ID_Ref_Apart_Class") FROM stdin;
1	1	104	2
2	1	105	3
3	1	103	2
4	1	102	2
5	1	101	2
6	1	100	2
7	2	200	3
8	2	201	3
9	2	202	5
10	2	203	5
11	2	204	3
12	2	205	4
13	3	300	6
14	3	301	6
15	3	302	6
16	3	303	7
17	3	304	7
18	3	305	7
\.


--
-- Data for Name: Bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Bookings" ("ID_Booking", "ID_Ref_User", "ID_Ref_Apart", "Start_Date", "End_Date", "Confirmed_Booking", "Is_Paid") FROM stdin;
4	16	5	2024-01-02	2024-01-05	0	0
5	1	4	2023-12-01	2023-12-10	1	0
9	1	5	2023-11-27	2023-12-04	0	0
10	1	4	2023-11-27	2023-12-04	0	0
11	1	4	2023-11-27	2023-12-04	0	0
12	1	1	2023-11-27	2023-12-04	1	1
8	1	6	2023-11-27	2023-12-04	0	1
1	16	7	2023-12-11	2023-12-15	0	0
2	16	5	2023-11-29	2024-01-01	1	0
3	16	18	2024-01-11	2024-01-31	1	1
\.


--
-- Data for Name: Users_Roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users_Roles" ("ID_Role", "Name") FROM stdin;
1	Адміністратор
2	Користувач
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" ("ID_User", "First_Name", "Middle_Name", "Last_Name", "Email", "Password", "Phone", "Credit_Card_Number", "Blood_Type", "Birthday", "Gender", "ID_Ref_Role") FROM stdin;
1	Charlie	\N	Morningstar	admin1@hazbin.com	Q12345	+38(050) 152-95-07	\N	AB(IV)	2000-02-20	2	1
16	Demo	\N	Demo	demo@vp.co.ua	11111	+38(099) 999-99-99	\N	AB(IV)	2004-02-25	1	2
2	Alastor	\N	Alastor	admin2@hazbin.com	Q12345	+38(050) 394-04-06	\N	O(I)	1999-08-12	1	1
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
-- Name: Apartments_Classes_ID_Apart_Class_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Apartments_Classes_ID_Apart_Class_seq"', 7, true);


--
-- Name: Apartments_ID_Apart_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Apartments_ID_Apart_seq"', 18, true);


--
-- Name: Booking_ID_Booking_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Booking_ID_Booking_seq"', 13, true);


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

SELECT pg_catalog.setval('public."Users_ID_User_seq"', 16, true);


--
-- PostgreSQL database dump complete
--

