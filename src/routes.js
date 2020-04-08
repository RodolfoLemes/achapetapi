const express = require('express')
const DataController = require('./controllers/DataController')
const DeviceController = require('./controllers/DeviceController')
const UserController = require('./controllers/UserController')

const routes = express.Router()

routes.get('/', (req, res) => {
    res.send('Funcionando')
})

//Rotas para recebimento de coordenadas
routes.get('/coordsWIFI', DataController.dataWifi)
routes.get('/coordsGPRS', DataController.dataGPRS)
routes.post('/coords', DataController.getDatas)

//Rotas para Usuarios
routes.post('/user', UserController.create)

//Rotas para Devices
routes.post('/device', DeviceController.create)

module.exports = routes