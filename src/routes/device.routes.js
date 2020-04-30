const express = require('express')

const DataController = require('../controllers/DataController')

const routes = express.Router()

//Rotas para recebimento de coordenadas
routes.get('/coordsWIFI', DataController.dataWifi)
routes.get('/coordsGPRS', DataController.dataGPRS)

module.exports = routes