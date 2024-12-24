const Router = require('express')
const router = new Router()
const classController = require('../controllers/apartmentClassController')

router.post('/', classController.create)
router.get('/', classController.getAll)

module.exports = router