const express = require('express')
const DataController = require('./controllers/DataController')
const routes = express.Router()

routes.get('/', (req, res) => {
    res.send('Funcionando')
})

//Rotas para recebimento de coordenadas
routes.get('/coordsWIFI', DataController.dataWifi)
routes.get('/coordsGPRS', DataController.dataGPRS)

module.exports = routes