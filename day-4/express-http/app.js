const express = require('express')

const app = express()

app.get('/',(req,res) =>
{
    res.end('hey you are using express')
})

app.post('/login',(req,res) =>
{
    const loginDt = req.body
    console.log(loginDt)
    res.end('POST:hey you are using express')
})

app.listen(9000,()=>
{
    console.log('Server Running Successfully')
})

const obj =
{
    name:'android',
    ver:12,
    modified:['abc','pqr'],
    crt:
    {

    }
}