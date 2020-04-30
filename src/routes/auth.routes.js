const express = require('express')

const AuthController = require('../controllers/authController')

const routes = express.Router()

routes.get('/', (req, res) => {
    res.send('Funcionando')
})

routes.post('/autenticate', AuthController.autenticate)

module.exports = routes