const Data = require('../models/Data')
const Device = require('../models/Device')

module.exports = {
    async dataWifi (req, res) {
        const { id, battery } = req.query

        const device = await Device.findOneAndUpdate({ imei: id }, { battery })

        const json = {
            coords: {
                lat: device.geofencing.coordCentralLat,
                lng: device.geofencing.coordCentralLon,
            },
            radius: device.geofencing.radius,
            walk: device.walkMode
        }

        let data = await Data.create({
            device: device._id,
            isWifi: true,
            coords: null
        })

        device.data.push(data)
        await device.save()
        /* for(let coords of coordsArray) {
            var data = await Data.create({
                coords,
                device: device._id,
                isWifi
            })
            device.data.push(data)
        }
        await device.save() */

        //  Socket.IO
        const userSocket = req.connectedUsers[device.user]
        console.log(userSocket)
        if(userSocket) {
            req.io.to(userSocket).emit('data', { data, battery })
        }
            
        return res.status(200).send(json)
    },

    async dataGPRS (req, res) {
        const { id, lat, lng, battery, geofencing } = req.query

        const device = await Device.findOneAndUpdate({ imei: id }, { battery })

        const json = {
            coords: {
                lat: device.geofencing.coordCentralLat,
                lng: device.geofencing.coordCentralLon,
            },
            radius: device.geofencing.radius,
            walk: device.walkMode
        }

        let coords = {
            lat,
            lon: lng,
            timestamps: new Date()
        }
        var data = await Data.create({
            coords,
            device: device._id,
            isWifi: false,
            isGeofencing: geofencing
        })
        device.data.push(data)
        await device.save()

        //  Socket.IO
        const userSocket = req.connectedUsers[device.user]
        console.log(userSocket)
        if(userSocket) {
            req.io.to(userSocket).emit('data', { data, battery })
        }

        return res.status(200).send(json)
    },

    async getDatas (req, res) {
        const { device, time = 1 } = req.query

        if(time == 0) {
            const datas = await Data.find({ device }).sort({ createAt: -1 })

            const { geofencing } = await Device.findById(device).select('geofencing')

            return res.send({ datas, geofencing })
        } else {
            let timeAgo = time * 3600000
            let timestamp = new Date(new Date() - timeAgo)
    
            const datas = await Data.find({ device,  createAt: { $gte: timestamp }}).sort({ createAt: -1 })
            
            const { geofencing } = await Device.findById(device).select('geofencing')

            return res.send({ datas, geofencing })
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