const db = require('../dbPgp');

class GuestController {
    async createGuest(req, res){
        console.log(req.body);
        // 400 - BAD REQUEST
        if(!req.body) return res.sendStatus(400);
      
        const guest = req.body;
        const sInsertGuest = 
        'INSERT INTO public."Guests"(' +
            '"First_Name", "Middle_Name", "Last_Name", "Passport_Number", "Passport_Date", "Phone", "Gender", "ID_Ref_User", "ID_Ref_Booking")' +
        ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
      
        // Виконання INSERT
        await db.query(sInsertGuest, 
          [guest.firstName, guest.middleName, guest.lastName,
            guest.passportNumber, guest.passportDate, 
            guest.phone, guest.gender, guest.idUser, guest.idBooking])
        .then(async() => {
      
          // Повертаємо ідентифікатор нового гостя
          await db.oneOrNone(`SELECT currval('"Guests_ID_Guest_seq"')  as id`)
          .then((data) => {
            console.log('DATA:', data);
            if (!data)
              res.status(404).send(`Not found Guests.Id. Something went wrong`);
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

    async updateGuest(req, res){
        console.log(req.body);
        // 400 - BAD REQUEST
        if(!req.body) return res.sendStatus(400);
      
        const guest = req.body;
        const sUpdateGuest = 
            'UPDATE public."Guests"' +
            ' SET "First_Name"=$1, "Middle_Name"=$2, "Last_Name"=$3, ' +
            '"Passport_Number"=$4, "Passport_Date"=$5, ' +
            '"Phone"=$6, "Gender"=$7, ' +
            '"ID_Ref_User"=$8, "ID_Ref_Booking"=$9' +
            ' WHERE "ID_Guest" = $10';
      
        // Виконання UPDATE
        await db.query(sUpdateGuest, 
          [ guest.firstName, guest.middleName, guest.lastName,
            guest.passportNumber, guest.passportDate, 
            guest.phone, guest.gender, guest.idUser, guest.idBooking, guest.id])
        .then(async() => {
            // Якщо все Ок, повертаємо той самий об'єкт
            res.json(guest);
          })
          .catch((error) => {
            console.log('ERROR:', error);
            res.status(500).send(`Error (update): ${error}`);
          });               
    }    

    async deleteGuest(req, res){
        console.log(req.body);
        // 400 - BAD REQUEST
        if(!req.body) return res.sendStatus(400);
        
        const guest = req.body;
        const sDeleteGuest = 
            'DELETE FROM public."Guests"' +
            ' WHERE "ID_Guest"=$1';
        
        // Виконання DELETE
        await db.query(sDeleteGuest, [guest.id])
        .then(async() => {
            // Якщо все Ок, повертаємо 200-й статус
            res.send(200);
        })
        .catch((error) => {
            console.log('ERROR:', error);
            res.status(500).send(`Error (del): ${error}`);
        });  
    }

    async getOneGuest(req, res){
        // Повертаємо всіх гостей по заданому бронюванню (GET)
        const idGuest = req.query.id;
        const sQuery = 
            'SELECT "ID_Guest" as "id", "First_Name" as "firstName", "Last_Name" as "lastName", "Middle_Name" as "middleName",' +
                '"Passport_Number" as "passportNumber", "Passport_Date" as "passportDate", ' +
                '"Phone" as "phone", "Gender" as "gender", "ID_Ref_User" as "idUser, "ID_Ref_Booking" as "idBooking"' +
            ' FROM public."Guests"' +
            ' WHERE "ID_Guest"=$1';     

        await db.oneOrNone(sQuery, [idGuest])
        .then((data) => {
            console.log('DATA:', data);
            if (!data)
                res.sendStatus(404);
            else
                res.json(data);
        })
        .catch((error) => {
            console.log('ERROR:', error);
            res.status(500).send(`Error (select): ${error}`);
        })
    }

    async getAllGuests(req, res){
        // Повертаємо всіх гостей по заданому бронюванню (GET)
        const idBooking = req.query.idBooking;
        const sQuery = 
            'SELECT "ID_Guest" as "id", "First_Name" as "firstName", "Last_Name" as "lastName", "Middle_Name" as "middleName",' +
                '"Passport_Number" as "passportNumber", "Passport_Date" as "passportDate", ' +
                '"Phone" as "phone", "Gender" as "gender", "ID_Ref_User" as "idUser", "ID_Ref_Booking" as "idBooking"' +
            ' FROM public."Guests"' +
             (idBooking > 0 ? ' WHERE "ID_Ref_Booking"=$1' : '') +
            ' ORDER BY "ID_Ref_Booking", "Last_Name", "First_Name"';
            ;     

        await db.any(sQuery, [idBooking])
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

module.exports = new GuestController()