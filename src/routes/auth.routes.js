const express = require('express')

const AuthController = require('../controllers/AuthController')

const routes = express.Router()

routes.get('/', (req, res) => {
    res.send('Funcionando')
})

routes.post('/autenticate', AuthController.autenticate)

module.exports = routes