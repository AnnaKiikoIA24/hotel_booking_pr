const {Apartment} = require('../models/models')
const ApiError = require('../errors/ApiError')

class ApartmentController {
    async create(req, res, next){
        try {
            let {Floor, Number_Of_Apartment, ID_Ref_Apart_Class} = req.body
            const apartment = await Apartment.create({Floor, Number_Of_Apartment, ID_Ref_Apart_Class})
            return res.json(apartment)
        } catch (e) {
            next(ApiError.badRequest(e.message)) 
        }
        
    }

    async getAll(req, res){
        const {ID_Ref_Apart_Class} = req.query
        let apartments;
        try {
           if (ID_Ref_Apart_Class){
                apartments = await Apartment.findAll({where: ID_Ref_Apart_Class})
            } else {
                apartments = await Apartment.findAll()
            } 
            return res.json(apartments)
        } catch (error) {
            throw error
        }
    }

    async getOne(req, res){
        try {
            const apartment = await Apartment.findByPk(apartmentId);
            if (!apartment) {
              throw new Error('Apartment not found.');
            }
            return res.json(apartment);
          } catch (error) {
            throw error;
          }
    }
}

module.exports = new ApartmentController()