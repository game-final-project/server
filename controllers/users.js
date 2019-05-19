const { User } = require('../models')
const { bcrypt, jwt } = require('../helpers')

class userController {
    static register (req, res) {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            score: 0
        })
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            if(err.errors.username) {
                res.status(400).json({
                    message: err.errors.username.message
                })
            } else if(err.errors.email) {
                res.status(400).json({
                    message: err.errors.email.message
                })
            } else if(err.errors.password) {
                res.status(400).json({
                    message: err.errors.password.message
                })
            } else {
                res.status(500).json(err)
            }
        })
    }

    static login (req, res) {
        User.findOne({
            email: req.body.email
        })
        .then(user => {
            if(user && bcrypt.comparePassword(req.body.password, user.password)) {
                let token = jwt.jwtSign({
                    id: user.id
                })
                res.status(200).json({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    token: token,
                    score: user.score
                })
            } else {
                res.status(400).json({
                    message: 'Invalid email/password'
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static getAllUser (req, res) {
        User.find({})
        .sort({score: 'desc'})
        .limit(5)
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static updateUser (req, res) {
        User.findOneAndUpdate({
            _id: req.params.id
        }, {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            score: req.body.score
        }, {
            new: true
        })
        .then(user => {
            if(user) {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = userController