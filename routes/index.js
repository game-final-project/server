const router = require('express').Router()
const users = require('./users')
const { isLogin } = require('../middlewares')
const { UserController } = require('../controllers')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(isLogin)
router.use('/users', users)

module.exports = router