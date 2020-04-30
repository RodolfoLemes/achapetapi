const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const routesMain = require('./routes/main.routes')
const routesAuth = require('./routes/auth.routes')
const routesDevice = require('./routes/device.routes')

const app = express()
require('dotenv').config()

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, /* useFindAndModify: false, */ useUnifiedTopology: true })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.disable('etag');
app.use(routesAuth)
app.use(routesMain)
app.use(routesDevice)


app.listen(process.env.PORT || 3333)