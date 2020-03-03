const express = require('express')

const routes = express.Router()

routes.get('/', (req, res) => {
    res.send('Funcionando')
})

//Rotas para envio de coordenadas

module.exports = routes