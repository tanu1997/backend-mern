const bodyParser = require('body-parser')
const express=  require('express')
const mongoose= require('mongoose')
const morgan= require('morgan')



const EmployeeRoute= require('./routes/employee')

mongoose.connect('mongodb://127.0.0.1/test');
const db= mongoose.connection

db.on('error',(err)=>
{
    console.log(err)
})

db.once('open',()=>
{
    console.log('Database Connection Established!')

})

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000;

app.listen(PORT , () => {

    console.log(`server listening on : ${PORT}`)
    
});


app.use('/api/employee',EmployeeRoute)