const mongoose = require('mongoose');


    mongoose.connect('mongodb://localhost:27017/test').then( () =>
    {
        console.log('Connected Sucessfully')
    })
    .catch(err =>
        {
            console.log('There is a problem in connection')
        })
   
        const Car = mongoose.model('Car',{
            model : String,
            country : Number,
            isFwd : Boolean,
            make : String
        })
        
        const express= require('express')
        const app = express()

        app.listen(9000,() => console.log('Car server started'))

        app.post('/', express.json(), (req,res) =>
        {
            const reqCar = req.body
            console.log(reqCar)

            const dbObj = new Car({
                model: reqCar.model,
                make: reqCar.make,
                isFwd: reqCar.isFwd,
                country: reqCar.country
            })

            dbObj.save()
            .then(
                sts =>res.status(201).json({sts: 'success'})
            ).catch(
                err => res.status(400).json({sts: 'err'})
            )

            res.json({sts : 'success'})
        })

        app.get('/',(req,res) =>
        {

        })

        app.put('/',(req,res) =>
        {

        })

        app.delete('/',(req,res) =>
        {

        })

