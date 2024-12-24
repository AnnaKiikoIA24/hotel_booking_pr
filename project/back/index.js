require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const session = require('express-session');
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
//npm install express-session dotenv sequelize pg pg-hstore cors
//npm install -D nodemon 
/* -> package.json "scripts": { 
        "dev": "nodemon index.js"  
      },
*/
//npm run dev


const PORT = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(session({ // use sessions 
    secret: '12345', // Секретний ключ для підпису cookie 
    resave: false,
    saveUninitialized: false,
  }));


//------------------
app.use(errorHandler) // used as the end hook

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}

start()