const Device = require('../models/Device')
const User = require('../models/User')

function isIMEIvalid(mac) {
    // Função que verifica se esse IMEI é verdadeiro
    // return /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(mac)
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
                user: req.userId,
                name,
                imei
            })

            user.devices.push(device._id)
            await user.save()

            // Essa requisição retorna todos os devices
            const devices = await Device.find({ user: req.userId }).select('-data')

            res.send({ sucess: true, devices })
        } else {
            res.send({ sucess: false, error: 'Invalid mac' })
        }
    },

    async patch(req, res) {
        const { petName, emergencialPhone, cep, phone } = req.body
        const { deviceId } = req.params

        const device = await Device.findOneAndUpdate({ _id: deviceId }, { 
            name: petName,
            emergencialPhone,
            cep
        }, { new: true }).select('-data')

        const user = await User.findOneAndUpdate({ _id: req.userId }, {
            phone
        }, { new: user }).select('phone')

        return res.send({ device, user })
    },

    async geofencing(req, res) {
        const { latitude, longitude, radius } = req.body
        const { deviceId } = req.params

        const device = await Device.findById(deviceId).select('-data')

        device.geofencing = {
            coordCentralLat: latitude,
            coordCentralLon: longitude,
            radius: radius
        }

        await device.save()

        return res.send({ sucess: true, device })
    },

    async getInfo(req, res) {
        const { deviceId } = req.params

        const device = await Device.findById(deviceId).select('-data')

        return res.send(device)
    }
}