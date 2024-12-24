SELECT a."ID_Apart" as "idApart", a."Number_Of_Apartment" as "numApart", a."Floor" as "floor",
	c."ID_Apart_Class" as "idApartClass", c."Name" as "nameApartClass", c."Number_Of_Rooms" as "numberRooms", c."Max_Number_Of_Guests" as "maxNumberGuests",
	c."Price" as "price"
FROM public."Apartments" a, public."Apartments_Classes" c
WHERE a."ID_Ref_Apart_Class" = c."ID_Apart_Class"
/* param numberRooms !== null */
AND c."Number_Of_Rooms" = 3
/* param maxPrice !== null */
AND c."Price" <= 340
/* param numberGuests !== null */
AND c."Max_Number_Of_Guests" >= 2
/* не попадают в занятые в запрошенный период */
AND a."ID_Apart" NOT IN (
	SELECT DISTINCT "ID_Ref_Apart" 
	FROM public."Booking"
	WHERE "Start_Date" <= 'dateFin' AND "End_Date" >= 'dateStart')