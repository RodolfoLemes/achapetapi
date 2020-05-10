const User = require('../models/User')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400, //O token expira em um dia
    })
}

module.exports = {
    async autenticate(req, res) {
        try {
            const { email, name } = req.body
            const user = await User.findOne({ email }).populate('devices', 'mac name battery' )

            if(!user) {
                const newUser = await User.create({ email, name })

                return res.send({
                    create: true,
                    user: newUser,
                    token: generateToken({ id: newUser._id })
                })
            }

            return res.send({ 
                create: false,
                user, 
                token: generateToken({ id: user._id })
            })
        } catch (error) {
            return res.send({ error })
        }
    },
}