const Data = require('../models/Data')
const Device = require('../models/Device')

module.exports = {
    async postData (req, res) {
        const { coords, imei } = req.query

        const device = await Device.find({ imei })

        await Data.create({
            coords, 
            device: device._id
        })

        res.send(true)
    },
}