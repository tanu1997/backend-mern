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

const jwt = require('jsonwebtoken')
const {expressjwt} = require('express-jwt')


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

    const token =jwt.sign(
        {
             appUser},
            'abc123',
            {algorithm: 'HS256'}
    )

    //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzg2OTk3ODN9.-nVSfffolLdCSPzVRn7nA5q95q_CcsatHPeCYZbbMaU

    res.json({
        sts : 'success',
        token, 
        msg : '✔ User Logged In Successfully'})
})


   
})

app.get('/balance', expressjwt({ secret: "abc123",
algorithms: ["HS256"]}),(req,res)=>{
    console.log(req.auth)
res.json({sts : 'success', dt:req.auth})
})
//if you have token , then and only then I will allow you to check the balance
//here client will pass the token from request header.
// this end point will extract or verify the token and check for validity



app.listen(9000,() =>
{
    console.log('✔ Server Running Successfully')
})

// 2. Integrate with mongo




// 3. Add JWT Security

