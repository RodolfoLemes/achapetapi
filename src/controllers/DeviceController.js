const Device = require('../models/Device')
const User = require('../models/User')

function isIMEIvalid(imei) {
    // Função que verifica se esse IMEI é verdadeiro
    return true
}

module.exports = {
    async create (req, res) {
        const { imei, name } = req.body

        const user = await User.findById(req.userId)

        if(await Device.findOne({ imei }))
            return res.send({ sucess: false, error: "Device already exist" })

        if(isIMEIvalid(imei)) {
            const device = await Device.create({
                user: userId,
                name,
                imei
            })

            user.devices.push(device._id)
            await user.save()

            res.send({ sucess: true, device })
        } else {
            res.send({ sucess: false })
        }
    }
}