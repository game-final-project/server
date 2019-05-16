module.exports = {
    isAuthorizedUser: (req, res, next) => {
        if(req.user.id.toString() === req.params.id) {
            next()
        } else {
            res.status(401).json({
                message: 'Unauthorized'
            })
        }
    },
}