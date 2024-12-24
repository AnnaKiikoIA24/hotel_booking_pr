const pgp = require('pg-promise')();
const db = require('../dbPgp');
// ===================== Qury String Users ========================================
const  sQueryUser =     
  'SELECT u."ID_User" as "id",  "First_Name" as "firstName", u."Last_Name" as "lastName", u."Middle_Name" as "middleName",' +
        'u."Email" as "email", u."Password" as "password", u."Phone" as "phone", u."Credit_Card_Number" as "creditCardNumber", u."Blood_Type" as "bloodType",' +
        'u."Birthday" as "birthday", u."Gender" as "gender", r."ID_Role" as "idRole", r."Name" as "nameRole"' +
  ' FROM public."Users" u, public."Users_Roles" r' +
  ' WHERE r."ID_Role"= u."ID_Ref_Role"';  

class User1Controller {

    async registration(req, res) {
      console.log(req.body);
      // 400 - BAD REQUEST
      if(!req.body) return res.sendStatus(400);
    
      const user = req.body;
      const sInsertUser = 
        'INSERT INTO public."Users" (' +
          '"First_Name", "Last_Name", "Middle_Name",' +
          '"Email", "Password" , "Phone", "Credit_Card_Number", "Blood_Type",' +
          '"Birthday", "Gender", "ID_Ref_Role")' +
        ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
    
      // Виконання INSERT
      await db.query(sInsertUser, 
        [user.firstName, user.lastName, user.middleName, 
          user.email, user.password, user.phone, user.creditCardNumber, user.bloodType,
          user.birthday, user.gender, user.idRole])
      .then(async() => {
    
        // Повертаємо доданого User
        const sWhereUser = pgp.as.format('AND u."Email"= $1', [user.email]); 
        console.log("sWhereUser=", sWhereUser);
    
        await db.oneOrNone(sQueryUser + '$1:raw', sWhereUser)
        .then((data) => {
          console.log('DATA:', data);
          if (!data)
            res.status(404).send(`Invalid login... Something went wrong`);
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
        if (error.toString().indexOf("UNQ_Email") != -1)
          res.status(409).send(`Error: user with login ${user.email} alrady exists!`);
        else
          res.status(500).send(`Error (add): ${error}`);
      })
    }
    
    async login(req, res) {
      console.log(req.body);
      // 400 - BAD REQUEST
      if(!req.body) return res.sendStatus(400);
    
      const sWhereUser = pgp.as.format('AND u."Email"= $1 AND u."Password"=$2', [req.body.email, req.body.password]); 
      console.log("sWhereUser=", sWhereUser);
    
      await db.oneOrNone(sQueryUser + '$1:raw', sWhereUser)
      .then((data) => {
        console.log('DATA:', data);
        if (!data)
          res.status(404).send(`Invalid login/password`);
        else
          res.json(data);
      })
      .catch((error) => {
        console.log('ERROR:', error);
        res.status(500).send(`Error: ${error}`);
      })
    }
    
    async updateUser(req, res) {
      console.log(req.body);
      // 400 - BAD REQUEST
      if(!req.body || !req.body.id) return res.sendStatus(400);
    
      const user = req.body;
      const sUpdateUser = 
        'UPDATE public."Users" ' +
        ' SET "First_Name"=$1, "Last_Name"=$2, "Middle_Name"=$3,' +
          '"Email"=$4, "Password"=$5, "Phone"=$6, "Credit_Card_Number"=$7, "Blood_Type"=$8,' +
          '"Birthday"=$9, "Gender"=$10, "ID_Ref_Role"=$11' +
        ' WHERE "ID_User" = $12';
    
      // Виконання UPDATE
      await db.query(sUpdateUser, 
        [user.firstName, user.lastName, user.middleName, 
          user.email, user.password, user.phone, user.creditCardNumber, user.bloodType,
          user.birthday, user.gender, user.idRole, user.id])
      .then(async() => {
    
        // Повертаємо оновленого User (перечитуємо інфу з БД)
        const sWhereUser = pgp.as.format('AND u."ID_User"= $1', [user.id]); 
        console.log("sWhereUser=", sWhereUser);
    
        await db.oneOrNone(sQueryUser + '$1:raw', sWhereUser)
        .then((data) => {
          console.log('DATA:', data);
          if (!data)
            res.status(404).send(`Неправильний логін... Something went wrong`);
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
        if (error.toString().indexOf("UNQ_Email") != -1)
          res.status(409).send(`Error: user with login ${user.email} alrady exists!`);
        else
          res.status(500).send(`Error update: ${error}`);
      })
    }

    async getOneUser(req, res) {
      const userId = req.params.id;

      const sWhereUser = pgp.as.format('AND u."User_ID"= $1', [userId]); 
      console.log("sWhereUser=", sWhereUser);
  
      await db.oneOrNone(sQueryUser + '$1:raw', sWhereUser)
        .then((data) => {
          console.log('DATA:', data);
          if (!data)
              res.sendStatus(404);
          else
              res.json(data);
        })
        .catch((error) => {
          console.log('ERROR:', error);
          res.status(500).send(`Error: ${error}`);
        })
    }        
    
    async getAllUsers(req, res) {
      await db.any(sQueryUser)
        .then((data) => {
          console.log('DATA:', data);
          res.json(data);
        })
        .catch((error) => {
          console.log('ERROR:', error);
          res.status(500).send(`Error: ${error}`);
        })
    }
}

module.exports = new User1Controller()