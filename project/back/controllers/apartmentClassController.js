const { ApartmentClass } = require('../models/models')
const ApiError = require('../errors/ApiError')

class ApartmentClassController {
    async create(req, res) {
        let { Name, Number_Of_Rooms, Max_Number_Of_Guests, Price} = req.body
        const apartmentClass = await ApartmentClass.create({ Name, Number_Of_Rooms, Max_Number_Of_Guests, Price})
        return res.json(apartmentClass)
    }

    async getAll(req, res) {
        const classes = await ApartmentClass.findAll()
        return res.json(classes)
    }
    
}

module.exports = new ApartmentClassController()