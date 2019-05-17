const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const sinon = require('sinon');
const app = require('../app')
const mongoose = require('mongoose')
const { User } = require('../models')

chai.use(chaiHttp)

before(function (done) {
    User
        .deleteMany({})
        .then(function () {
            sinon.restore();
            done();
        })
        .catch(function (err) {
            console.log(err);
        });
});

after(function (done) {
    User
        .deleteMany({})
        .then(function () {
            sinon.restore();
            done();
        })
        .catch(function (err) {
            console.log(err);
        });
});

let idUser = ''
let tokenUser = ''
let fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZGUzYWVmZTU3ZWExMjdjNzkzN2U4OCIsImlhdCI6MTU1ODA2Nzk1Mn0.TDPDDMOD4Qa0z0hnm17XFDH-45I-LssJOBLo8-nJ5ps'

describe('REGISTER USER TEST', function () {
    describe('success', () => {
        it('Should make sure that user can register /register with POST request', function (done) {
            const user = {
                username: 'willy',
                email: 'willy@gmail.com',
                password: '1Qazxc'
            }

            chai
                .request(app)
                .post('/register')
                .send(user)
                .end(function (err, res) {
                    should.not.exist(err)
                    res.should.have.status(201)
                    res.body.should.be.an('object')
                    res.body.should.have.property('_id')
                    res.body.should.have.property('username')
                    res.body.should.have.property('email')
                    res.body.should.have.property('password')
                    res.body.should.have.property('createdAt')
                    res.body.should.have.property('updatedAt')
                    res.body._id.should.to.be.a('string')
                    res.body.username.should.to.be.a('string')
                    res.body.email.should.to.be.a('string')
                    res.body.createdAt.should.to.be.a('string')
                    res.body.updatedAt.should.to.be.a('string')
                    res.body.username.should.not.equal(null)
                    res.body.email.should.not.equal(null)
                    res.body.password.should.not.equal(null)
                    res.body.password.should.have.lengthOf.above(5)
                    done()
                })
        })
    })

    describe('failed', () => {
        it(`Should make sure that somebody can't be register if name empty /register with POST request`, function (done) {
            const user = {
                username: '',
                email: 'willypray@gmail.com',
                password: '1Qazxc'
            }
            chai
                .request(app)
                .post('/register')
                .send(user)
                .end(function (err, res) {
                    res.body.should.to.be.an('object')
                    res.body.should.be.have.property('message')
                    res.body.message.should.equal('Please input username')
                    res.should.have.status(400)
                    done()
                })
        })
        it(`Should make sure that somebody can't be register if email not using email format /register with POST request`, function (done) {
            const user = {
                username: 'willy',
                email: 'aasada',
                password: '1Qazxc'
            }
            chai
                .request(app)
                .post('/register')
                .send(user)
                .end(function (err, res) {
                    res.body.should.to.be.an('object')
                    res.body.should.be.have.property('message')
                    res.body.message.should.equal('Invalid Email')
                    res.should.have.status(400)
                    done()
                })
        })
        it(`Should make sure that somebody can't be register if email has been taken /register with POST request`, function (done) {
            const user = {
                username: 'willy',
                email: 'willy@gmail.com',
                password: '1Qazxc'
            }
            chai
                .request(app)
                .post('/register')
                .send(user)
                .end(function (err, res) {
                    res.body.should.to.be.an('object')
                    res.body.should.be.have.property('message')
                    res.body.message.should.equal('Email has been used')
                    res.should.have.status(400)
                    done()
                })
        })
        it(`Should make sure that somebody can't be register if password is not good /register with POST request`, function (done) {
            const user = {
                username: 'willy',
                email: 'willy2@gmail.com',
                password: 'abc'
            }
            chai
                .request(app)
                .post('/register')
                .send(user)
                .end(function (err, res) {
                    res.body.should.to.be.an('object')
                    res.body.should.be.have.property('message')
                    res.body.message.should.equal('Password must contain at least one letter, one number, and minimum six characters')
                    res.should.have.status(400)
                    done()
                })
        })

        // it(`Should make sure to catch when server error /register with POST request`, function (done) {
        //     sinon.stub(mongoose.Model, 'find').callsFake(function () {
        //         return new Promise((resolve, reject) => {
        //             reject('testing')
        //         })
        //     })
        // })
    })
})

describe('LOGIN TEST', () => {
    describe('success', () => {
        it(`Should make sure that user can login /login with POST request`, function (done) {
            const user = {
                email: 'willy@gmail.com',
                password: '1Qazxc'
            }
            chai
                .request(app)
                .post('/login')
                .send(user)
                .end(function (err, res) {
                    should.not.exist(err)
                    res.should.have.status(200)
                    res.body.should.to.be.an('object')
                    res.body.should.have.property('id')
                    res.body.should.have.property('username')
                    res.body.should.have.property('email')
                    res.body.should.have.property('token')
                    res.body.id.should.to.be.a('string')
                    res.body.username.should.to.be.a('string')
                    res.body.email.should.to.be.a('string')
                    res.body.token.should.to.be.a('string')
                    idUser = res.body.id
                    tokenUser = res.body.token
                    done()
                })
        })
    })

    describe('failed', () => {
        it(`Should make sure that email can't login if have wrong or empty email /login with POST request`, function (done) {
            const user = {
                email: 'willy@ma.com',
                password: '1Qazxc'
            }
            chai
                .request(app)
                .post('/login')
                .send(user)
                .end(function (err, res) {
                    res.body.should.to.be.an('object')
                    res.body.should.be.have.property('message')
                    res.body.message.should.equal('Invalid email/password')
                    res.should.have.status(400)
                    done()
                })
        })
    })
})

describe('PUT USER BY ID TEST', () => {
    describe('success', () => {
        it(`Should make sure that user can update info /users/:id with PUT request`, function (done) {
            const user = {
                username: 'willy3',
                email: 'willy3@gmail.com',
                password: '1Qazxc',
                score: 50
            }
            chai
                .request(app)
                .put(`/users/${idUser}`)
                .set({ token: tokenUser })
                .send(user)
                .end(function (err, res) {
                    should.not.exist(err)
                    res.should.have.status(200)
                    res.body.should.to.be.an('object')
                    res.body.should.have.property('_id')
                    res.body.should.have.property('username')
                    res.body.should.have.property('email')
                    res.body.should.have.property('password')
                    res.body.should.have.property('score')
                    res.body._id.should.to.be.a('string')
                    res.body.username.should.to.be.a('string')
                    res.body.email.should.to.be.a('string')
                    res.body.password.should.to.be.a('string')
                    res.body.score.should.to.be.a('number')
                    done()
                })
        })
    })

    describe('failed', () => {
        it(`Should make sure that user must authenticated for update info /users/:id with PUT request`, function (done) {
            chai
                .request(app)
                .put('/users/12345')
                .set({ token: tokenUser })
                .end(function (err, res) {
                    res.body.should.to.be.an('object')
                    res.body.should.be.have.property('message')
                    res.body.message.should.equal('Unauthorized')
                    res.should.have.status(401)
                    done()
                })
        })
    })
})

describe('GET ALL USER TEST', () => {
    describe('success', () => {
        it(`Should make sure that we can get all user /users with GET request`, function (done) {
            chai
                .request(app)
                .get(`/users`)
                .set({ token: tokenUser })
                .end(function (err, res) {
                    should.not.exist(err)
                    res.should.have.status(200)
                    res.body.should.to.be.an('array')
                    res.body[0].should.have.property('_id')
                    res.body[0].should.have.property('username')
                    res.body[0].should.have.property('email')
                    res.body[0]._id.should.to.be.a('string')
                    res.body[0].username.should.to.be.a('string')
                    res.body[0].email.should.to.be.a('string')
                    done()
                })
        })
    })

    describe('failed', () => {
        it(`Should make sure that user must provide token /users with GET request`, function (done) {
            chai
                .request(app)
                .get(`/users`)
                .end(function (err, res) {
                    res.body.should.to.be.an('object')
                    res.body.should.be.have.property('message')
                    res.body.message.should.equal('Please provide a valid token')
                    res.should.have.status(401)
                    done()
                })
        })

        it(`Should make sure that user must authorized /users with GET request`, function (done) {
            chai
                .request(app)
                .get(`/users`)
                .set({ token: fakeToken })
                .end(function (err, res) {
                    res.body.should.to.be.an('object')
                    res.body.should.be.have.property('message')
                    res.body.message.should.equal('Unauthorized')
                    res.should.have.status(401)
                    done()
                })
        })
    })
})

// describe('DELETE USER TEST', () => {
//     describe('success', () => {
//         it(`Should make sure that just role === 'admin' can delete user /users/:id with DELETE request`, function (done) {
//             chai
//                 .request(app)
//                 .delete(`/users/${idUser}`)
//                 .set({ token: tokenAdmin })
//                 .end(function (err, res) {
//                     should.not.exist(err)
//                     res.should.have.status(200)
//                     res.body.should.be.an('object')
//                     res.body.should.have.property('message')
//                     res.body.message.should.to.be.a('string')
//                     res.body.message.should.not.equal(null)
//                     res.body.message.should.equal('User successfully deleted')
//                     done()
//                 })
//         })
//     })

//     describe('failed', () => {
//         it(`Should make sure that user must authorized /users/:id with DELETE request`, function (done) {
//             chai
//                 .request(app)
//                 .delete(`/users/${idUser}`)
//                 .set({ token: tokenUser })
//                 .end(function (err, res) {
//                     res.body.should.to.be.an('object')
//                     res.body.should.be.have.property('message')
//                     res.body.message.should.equal('Unauthorized')
//                     res.should.have.status(401)
//                     done()
//                 })
//         })
//     })
// })