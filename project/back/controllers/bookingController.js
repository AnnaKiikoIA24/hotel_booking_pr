const ApiError = require('../errors/ApiError')
const pgp = require('pg-promise')();
const db = require('../dbPgp');

class BookingController {
    async createBooking(req, res){
      console.log(req.body);
      // 400 - BAD REQUEST
      if(!req.body) return res.sendStatus(400);
    
      const booking = req.body;
      const sInsertBooking = 
        'INSERT INTO public."Bookings" (' +
          '"ID_Ref_User", "ID_Ref_Apart",' +
          '"Start_Date", "End_Date" , ' +
          '"Confirmed_Booking", "Is_Paid")' +
        ' VALUES ($1, $2, $3, $4, $5, $6)';
    
      // Виконання INSERT
      await db.query(sInsertBooking, 
        [booking.idUser, booking.idApart, 
          booking.dateStart, booking.dateFin, 
          booking.isConfirmed, booking.isPaid])
      .then(async() => {
    
        // Повертаємо ідентифікатор нового бронювання
        await db.oneOrNone(`SELECT currval('"Booking_ID_Booking_seq"')  as id`)
        .then((data) => {
          console.log('DATA:', data);
          if (!data)
            res.status(404).send(`Not found Bookings.Id. Something went wrong`);
          else
            res.json(data);
        })
        .catch((error) => {
          console.log('ERROR:', error);
          res.status(500).send(`Error (select): ${error}`);
        })
      })
      .catch((error) => {
        console.log('ERROR:', error);
        res.status(500).send(`Error (add): ${error}`);
      })        
    }

    async updateBooking(req, res){
      console.log(req.body);
      // 400 - BAD REQUEST
      if(!req.body) return res.sendStatus(400);
    
      const booking = req.body;
      const sUpdateBooking = 
        'UPDATE public."Bookings"' +
        ' SET "Confirmed_Booking"=$1' +
        ', "Is_Paid"=$2' +
        ' WHERE "ID_Booking"=$3';
    
      // Виконання UPDATE
      await db.query(sUpdateBooking, 
        [ booking.isConfirmed, booking.isPaid, booking.id])
      .then(async() => {
          // Якщо все Ок, повертаємо той самий об'єкт
          res.json(booking);
        })
        .catch((error) => {
          console.log('ERROR:', error);
          res.status(500).send(`Error (update): ${error}`);
        });               
    }

    async deleteBooking(req, res){
      console.log(req.body);
      // 400 - BAD REQUEST
      if(!req.body) return res.sendStatus(400);
    
      const booking = req.body;
      const sDeleteBooking = 
        'DELETE FROM public."Bookings"' +
        ' WHERE "ID_Booking"=$1';
    
      // Виконання DELETE
      await db.query(sDeleteBooking, 
        [ booking.id])
      .then(async() => {
          // Якщо все Ок, повертаємо 200-й статус
          res.send(200);
        })
        .catch((error) => {
          console.log('ERROR:', error);
          res.status(500).send(`Error (del): ${error}`);
        });  
    }

    async getAllFreeRooms(req, res){
      // Повертаємо вільні номери за заданими параметрами (GET)
      const params = req.query;
      const sQueryFree = 
        'SELECT a."ID_Apart" as "idApart", a."Number_Of_Apartment" as "numApart", a."Floor" as "floor",' +
            'c."ID_Apart_Class" as "idApartClass", c."Name" as "nameApartClass", c."Number_Of_Rooms" as "numberRooms", ' +
            'c."Max_Number_Of_Guests" as "maxNumberGuests", c."Price" as "price"' +
        ' FROM public."Apartments" a, public."Apartments_Classes" c' +
        ' WHERE a."ID_Ref_Apart_Class" = c."ID_Apart_Class"' +
        /* param numberRooms !== null */
        (params.numberRooms > 0 ? ' AND c."Number_Of_Rooms" = $3' : '') +
        /* param maxPrice !== null */
        (params.maxPrice > 0 ? ' AND c."Price" <= $4' : '') +
        /* param numberGuests !== null */
        (params.numberGuests > 0 ? ' AND c."Max_Number_Of_Guests" >= $5' : '') +
        /* не попадают в занятые в запрошенный период */
        ' AND a."ID_Apart" NOT IN (' +
        ' SELECT DISTINCT "ID_Ref_Apart"' +
        ' FROM public."Bookings"' +
        ' WHERE $1 BETWEEN "Start_Date" AND "End_Date" OR $2 BETWEEN "Start_Date" AND "End_Date")' +
        ' ORDER BY a."Number_Of_Apartment"';      
  
      await db.any(sQueryFree, [params.dateStart, params.dateFin, params.numberRooms, params.maxPrice, params.numberGuests])
      .then((data) => {
          console.log('DATA:', data);
          res.json(data);
      })
      .catch((error) => {
          console.log('ERROR:', error);
          res.status(500).send(`Error (select): ${error}`);
      })
        
    }

    async getAllBookedRooms(req, res){
      // Повертаємо зарезерврвані номери за заданими параметрами (GET)
      const params = req.query;
      const sQueryBooked = 
        'SELECT b."ID_Booking" as "id", b."Start_Date" as "dateStart", b."End_Date" as "dateFin",' +
            'u."ID_User" as "idUser", u."Email" as "email", u."Phone" as "phone",' +
            'u."First_Name" as "firstName", u."Last_Name" as "lastName",' +
            'a."ID_Apart" as "idApart", a."Number_Of_Apartment" as "numApart", a."Floor" as "floor",' +
            'c."ID_Apart_Class" as "idApartClass", c."Name" as "nameApartClass",' +
            'c."Number_Of_Rooms" as "numberRooms", c."Max_Number_Of_Guests" as "maxNumberGuests",' +
            'c."Price" as "price", b."Confirmed_Booking" as "isConfirmed", b."Is_Paid" as "isPaid",' +
            '(SELECT COUNT(*) FROM public."Guests" WHERE "ID_Ref_Booking"=b."ID_Booking") as "countGuests"' +
        ' FROM public."Bookings" b, public."Apartments" a, public."Apartments_Classes" c, public."Users" u' +
        ' WHERE a."ID_Ref_Apart_Class" = c."ID_Apart_Class"' +
        ' AND b."ID_Ref_Apart"=a."ID_Apart"' +
        ' AND b."ID_Ref_User"=u."ID_User"' +
        /* param idUser !== null */
        (params.idUser > 0 ? ' AND b."ID_Ref_User" = $1' : '') +
        /* param dateFin !== null */
        (params.dateFin ? ' AND b."Start_Date" <= $3' : '') +
        /* param dateStart !== null */
        (params.dateStart ? ' AND b."End_Date" >= $2' : '') +
        /* param isConfirmed !== null */
        (params.isConfirmed ? ' AND b."Confirmed_Booking" = $4' : '') +
        /* param isPaid !== null */
        (params.isPaid ? ' AND b."Is_Paid" = $5' : '') +
        ' ORDER BY b."Start_Date", a."Number_Of_Apartment"';      
  
      await db.any(sQueryBooked, [params.idUser, params.dateStart, params.dateFin, params.isConfirmed, params.isPaid])
      .then((data) => {
          console.log('DATA:', data);
          res.json(data);
      })
      .catch((error) => {
          console.log('ERROR:', error);
          res.status(500).send(`Error (select): ${error}`);
      })
    }

}

module.exports = new BookingController()