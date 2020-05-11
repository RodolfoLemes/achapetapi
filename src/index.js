const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const routesMain = require('./routes/main.routes')
const routesAuth = require('./routes/auth.routes')
const routesDevice = require('./routes/device.routes')

const connectedUsers = {}
io.on('connection', socket => {
    const { user } = socket.handshake.query
    console.log(user)
    connectedUsers[user] = socket.id
    console.log(connectedUsers)
})


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, /* useFindAndModify: false, */ useUnifiedTopology: true })

app.use((req, res, next) => { // Isso é um middleware que faz com que seja executada antes das proprias rotas
    req.io = io
    req.connectedUsers = connectedUsers

    return next()
})
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.disable('etag');
app.use(routesDevice)
app.use(routesAuth)
app.use(routesMain)

server.listen(process.env.PORT || 8080)
app.listen(process.env.PORT || 3333)