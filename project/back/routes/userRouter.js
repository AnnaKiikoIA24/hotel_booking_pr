const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logoutUser)
router.patch('/update:id', userController.updateUser)
router.get('/user:id', userController.getOneUser)
router.get('/users', userController.getAllUsers)


module.exports = router