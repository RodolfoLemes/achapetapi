const express = require('express')

const DataController = require('../controllers/DataController')
const DeviceController = require('../controllers/DeviceController')
const UserController = require('../controllers/UserController')

const authMiddleware = require('../middlewares/auth')

const routes = express.Router()
routes.use(authMiddleware)

//Rotas para Coodenadas
routes.get('/coords', DataController.getDatas)

//Rotas para Usuarios
routes.post('/user', UserController.create)

//Rotas para Devices
routes.post('/device', DeviceController.create)
routes.patch('/device/:deviceId', DeviceController.patch)

module.exports = routes