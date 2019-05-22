const { jwt } = require('../helpers')
const { User } = require('../models')

module.exports = {
    isLogin: (req, res, next) => {
        let payload = jwt.jwtVerify(req.headers.token)
        
        if(payload) {
            User.findById(payload.id)
            .then(user => {
                if(user) {
                    req.user = {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        token: req.headers.token,
                    }
                    next()
                } else {
                    res.status(401).json({
                        message: 'Unauthorized'
                    })
                }
            })
        } else {
            res.status(401).json({
                message: 'Please provide a valid token'
            })
        }
    }
}