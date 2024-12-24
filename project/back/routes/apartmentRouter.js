const Router = require('express')
const router = new Router()
const apartmentController = require('../controllers/apartmentController')

router.post('/', apartmentController.create)
router.get('/', apartmentController.getAll)
router.get('/:id',apartmentController.getOne)

//router.get('/free', apartmentController.getAllFreeRooms)
//router.get('/booked'/*'busy'*/, apartmentController.getAllBookedRooms) ???


module.exports = router