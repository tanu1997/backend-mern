// 1. Setup Express App

const express = require('express')
const app = express()



app.post('/login',express.json(), (req, res)=>
{
    const body = req.body
    console.log(body)
    res.json({ sts : 'success', msg : 'Logged In Successfully'})
    
})

app.listen(6000,() =>
{
    console.log('✔ Server Running Successfully')
})

// 2. Integrate with mongo
// 3. Add JWT Security