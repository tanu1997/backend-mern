const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1/test').then(() => {
    console.log('Connected Successfully')

   
   
}).catch(err => {
    console.log('There is a problem in connnection')
}) 

const CarSchema = new mongoose.Schema(
    {
        model : {type : String ,unique : true},
        slug : {type : String ,unique: true},
        country : {type: Number},
        isFwd : { type : Boolean},
        make : { type :String}
    }
)

CarSchema.pre('save' ,async function(){
    console.log('Waiting')
  await  new Promise((res, rej) =>
   {
    setTimeout( () =>
    {
        console.log('Data Fetched')
        res()
    }   ,1500)
   })

   console.log('I have reached this line')
})

CarSchema.pre('save' ,async function(next){
    console.log('Pre : Middleware Executed')
    console.log(this)
    this.slug = slugifyModel(this.model)

   

    next()
})

CarSchema.post('save' ,doc =>{
    console.log('Post : Middleware Executed')
    console.log('ID : ' +doc._id)
   
})

CarSchema.post('save' ,(error,doc,next) =>{
    console.log('Post : Middleware Executed')
    console.log('ID : ' +doc._id)
    if(error.name === 'MongoServerError' && error.code === 11000)
    {
        next(new Error('Model Should be Unique'))
    }else
    {
        next()
    }
   
})


const Car = mongoose.model('Car',CarSchema)



const express = require('express')
const app = express()

app.listen(9000, () => console.log('Car Server Started'))

app.post('/', express.json(),(req,res) =>
{
    const reqCar = req.body
    console.log(reqCar)

    

    const dbObj =new Car({...reqCar})
    
    

    dbObj.save()
    .then(
        sts => res.status(201).json({sts : 'success'})
    )
    .catch(
        err =>
        {
           
            res.status(400).json({sts : 'err' ,msg: err.message })
        }
    )

   
})

app.get('/',(req,res) =>
{
    const cars =Car.find({},{__v :0},(err,crs) =>
    {
        if(err) res.status(500).json()
        res.json(crs)
    },)
   
})

app.put('/',(req,res) =>
{
    
})
app.delete('/',(req,res) =>
{
    
})

function slugifyModel(model)
{
    return model.toString()
                .toLowerCase()
                .replaceAll(' ','_')
}