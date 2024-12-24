const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const user1Router = require('./user1Router')
const bookingRouter = require('./bookingRouter')
const guestRouter = require('./guestRouter')
const apartmentRouter = require('./apartmentRouter')
const apartmentClassRouter = require('./apartmentClassRouter')

router.use('/user', userRouter)
router.use('/user1', user1Router)
router.use('/apartmentClass', apartmentClassRouter)
router.use('/apartment', apartmentRouter)
router.use('/booking', bookingRouter)
router.use('/guest', guestRouter)


module.exports = router