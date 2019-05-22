const router = require('express').Router()
const { UserController } = require('../controllers')
const { isAuthorizedUser } = require('../middlewares')
const { isLogin } = require('../middlewares')

router.get('/', UserController.getAllUser)

router.use(isLogin)
router.put('/:id', isAuthorizedUser, UserController.updateUser)

module.exports = router