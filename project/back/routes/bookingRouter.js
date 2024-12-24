const Router = require('express')
const router = new Router()
const bookingController = require('../controllers/bookingController')

router.post('/', bookingController.createBooking)
router.patch('/', bookingController.updateBooking)
router.delete('/', bookingController.deleteBooking)
router.get('/free', bookingController.getAllFreeRooms)
router.get('/booked'/*'busy'*/, bookingController.getAllBookedRooms) 

module.exports = router