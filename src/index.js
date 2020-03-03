const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const app = express()
require('dotenv').config()

//mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useFindAndModify: false })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.listen(process.env.PORT || 3333)