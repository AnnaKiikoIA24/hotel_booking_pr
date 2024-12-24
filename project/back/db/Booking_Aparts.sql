SELECT b."ID_Booking" as "id", b."Start_Date" as "dateStart", b."End_Date" as "dateFin", 
u."ID_User" as "idUser", u."Email" as "email", u."Phone" as "phone", 
u."First_Name" as "firstName", u."Last_Name" as "lastName",
a."ID_Apart" as "idApart", a."Number_Of_Apartment" as "numApart", a."Floor" as "floor",
c."ID_Apart_Class" as "idApartClass", c."Name" as "nameApartClass", c."Number_Of_Rooms" as "numberRooms", c."Max_Number_Of_Guests" as "maxNumberGuests",
c."Price" as "price", b."Confirmed_Booking" as "isConfirmed", b."Is_Paid" as "isPaid",
(SELECT COUNT(*) FROM public."Guests" WHERE "ID_Ref_Booking"=b."ID_Booking") as "countGuests
FROM public."Booking" b, public."Apartments" a, public."Apartments_Classes" c, public."Users" u
WHERE a."ID_Ref_Apart_Class" = c."ID_Apart_Class"
AND b."ID_Ref_Apart"=a."ID_Apart"
AND b."ID_Ref_User"=u."ID_User"
/* param idUser !== null */
AND b."ID_Ref_User" = 3
/* param dateFin !== null */
-- AND b."Start_Date" <= 'dateFin' 
/* param dateStart !== null */
-- AND b."End_Date" >= 'dateStart'
/* param isConfirmed !== null */
AND b."Confirmed_Booking" = 1
/* param isPaid !== null */
AND b."Is_Paid" = 1
ORDER BY b."Start_Date"