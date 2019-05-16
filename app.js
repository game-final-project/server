require("dotenv").config()

const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

const mongoose = require("mongoose")

mongoose.connect(`mongodb://localhost/finalProject`, { useNewUrlParser: true })

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

const indexRouter = require('./routes/')

app.use('/', indexRouter)

app.listen(port, () => {
    console.log("listening on port",port)
})
