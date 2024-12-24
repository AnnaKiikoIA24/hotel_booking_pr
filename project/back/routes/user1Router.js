const Router = require('express')
const router = new Router()
const user1Controller = require('../controllers/user1Controller')

router.post('/registration', user1Controller.registration)
router.post('/login', user1Controller.login)
router.put('/', user1Controller.updateUser)
router.get('/:id', user1Controller.getOneUser)
router.get('/', user1Controller.getAllUsers)

module.exports = router