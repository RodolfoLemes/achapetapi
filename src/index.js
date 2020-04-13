const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')
const app = express()
require('dotenv').config()

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, /* useFindAndModify: false, */ useUnifiedTopology: true })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.disable('etag');
app.use(routes)

app.listen(process.env.PORT || 3333)