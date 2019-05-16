const router = require('express').Router()
const { UserController } = require('../controllers')
const { isAuthorizedUser } = require('../middlewares')

router.get('/', UserController.getAllUser)
router.put('/:id', isAuthorizedUser, UserController.updateUser)

module.exports = router