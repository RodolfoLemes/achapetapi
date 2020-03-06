const express = require('express')
const DataController = require('./controllers/DataController')
const routes = express.Router()

routes.get('/', (req, res) => {
    res.send('Funcionando')
})

//Rotas para recebimento de coordenadas
routes.post('/coords', DataController.postData)
routes.get('/coords', DataController.testData)

module.exports = routes