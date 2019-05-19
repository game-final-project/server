const router = require('express').Router()
const users = require('./users')
const { UserController } = require('../controllers')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use('/users', users)

module.exports = router