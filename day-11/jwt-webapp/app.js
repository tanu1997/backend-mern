const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');

const AppUserSchema = new mongoose.Schema({
    userName: {type: String, unique: true},
    password: {type: String},
})

const AppUser =mongoose.model('AppUser',AppUserSchema)

const op = new AppUser({  userName : 'abc123', password: 'abc123'})
op.save()


// 1. Setup Express App

const express = require('express');
const { response } = require('express');
const app = express()



app.post('/login',express.json(), (req, res)=>
{
    const {userName,password} = req.body

    AppUser.findOne({userName, password },(err, appUser)=>
{
    if(err)
    {
        console.log('✖ Db Error')
        response.json({sts : 'Fail', msg : 'Db Error'})
       
    }
    if(appUser == null)
    {
        console.log('✖ User not Found')
        response.json({sts : 'Fail', msg : 'User not Found'})
    }
    console.log(appUser)
    res.json({sts : 'success',token:'Not Implemented Yet', msg : '✔ User Logged In Successfully'})
})


   
})

app.listen(6000,() =>
{
    console.log('✔ Server Running Successfully')
})

// 2. Integrate with mongo




// 3. Add JWT Security