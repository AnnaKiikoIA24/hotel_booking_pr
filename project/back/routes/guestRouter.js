const Router = require('express')
const router = new Router()
const guestController = require('../controllers/guestController')

router.post('/', guestController.createGuest)
router.put('/', guestController.updateGuest)
router.delete('/', guestController.deleteGuest)
router.get('/:id', guestController.getOneGuest)
router.get('/', guestController.getAllGuests)

module.exports = router