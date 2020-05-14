const Data = require('../models/Data')
const Device = require('../models/Device')

module.exports = {
    async dataWifi (req, res) {
        const { id, lat1, lng1, lat2, lng2, lat3, lng3, battery } = req.query

        let time = new Date();
        let timestamps = [
            time,
            new Date(time - 450000),
            new Date(time - 900000)
        ]
        let coordsArray = [
            { lat: lat1, lon: lng1, timestamp: timestamps[2] },
            { lat: lat2, lon: lng2, timestamp: timestamps[1] },
            { lat: lat3, lon: lng3, timestamp: timestamps[0] }
        ]
        let isWifi = true

        const device = await Device.findOneAndUpdate({ imei: id }, { battery })

        for(let coords of coordsArray) {
            var data = await Data.create({
                coords,
                device: device._id,
                isWifi
            })
            device.data.push(data)
        }
        await device.save()

        //  Socket.IO
        const userSocket = req.connectedUsers[device.user]
        console.log(userSocket)
        if(userSocket)
            req.io.to(userSocket).emit('data', data)

        res.status(200).send('Sucess')
    },

    async dataGPRS (req, res) {
        const { id, lat1, lng1, lat2, lng2, lat3, lng3, battery, geofencing } = req.query

        let time = new Date();
        let timestamps = []
        if(geofencing) {
            timestamps = [
                time,
                new Date(time - 450000),
                new Date(time - 900000)
            ]
        } else {
            timestamps = [
                time,
                new Date(time - 150000),
                new Date(time - 300000)
            ]
        }
        
        let coordsArray = [
            { lat: lat1, lon: lng1, timestamp: timestamps[2] },
            { lat: lat2, lon: lng2, timestamp: timestamps[1] },
            { lat: lat3, lon: lng3, timestamp: timestamps[0] }
        ]
        let isWifi = false

        const device = await Device.findOneAndUpdate({ imei: id }, { battery })

        for(let coords of coordsArray) {
            var data = await Data.create({
                coords,
                device: device._id,
                isWifi
            })
            device.data.push(data)
        }
        await device.save()

        //  Socket.IO
        const userSocket = req.connectedUsers[device.user]
        req.io.to(userSocket).emit('data', data)

        res.status(200).send('Sucess')
    },

    async getDatas (req, res) {
        const { device, time = 1 } = req.query

        if(time == 0) {
            const datas = await Data.find({ device }).sort({ createAt: -1 })

            res.send({ datas })
        } else {
            let timeAgo = time * 3600000
            let timestamp = new Date(new Date() - timeAgo)
    
            const datas = await Data.find({ device,  createAt: { $gte: timestamp }}).sort({ createAt: -1 })
            
            const geofencing = await Device.findById(device).select('geofencing')
            console.log(geofencing)
            res.send({ datas, geofencing })
        }
    },

    /* async getNeighborhoodDatas(req, res) { // Terminar isso
        const { device } = req.query

        const { coordCentral, radius } = await Device.findById({ device }).select('geofencing')

        let timeAgo = 3600000
        let timestamp = new Date(new Date() - timeAgo)
        const firstDatasFriendly = await Data.find({ createAt: { $gte: timestamp }}).sort({ createAt: -1 })

        let neighbors = []
        firstDatasFriendly.map(element => {
            let distance = Math.sqrt(
                Math.pow(coordCentralLat + element.coords.lat, 2) +
                Math.pow(coordCentralLong + element.coords.lon, 2)
            )

            if(distance <= radius) {
                neighbors.push({
                    device: element.device,
                    coords: element.coords
                })
            }
        })
    } */

}