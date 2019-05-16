const jwt = require('jsonwebtoken')

module.exports = {
    sign: function (payload) {
        let token = jwt.sign(payload, process.env.SECRET_KEY)
        return token
    },
    verify: function (token) {
        let tokenCheck = jwt.verify(token, process.env.SECRET_KEY)
        return tokenCheck
    }
}
