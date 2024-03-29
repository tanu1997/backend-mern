const mongoose =require('mongoose')
const Schema = mongoose.Schema

const userSchema =new Schema({
    name: 
    {
        type:String
    },
    designation:
    {
        type:String
    },
    email:
    {
        type:String
    },
    password:
    {
        type:String
    },
    phone:
    {
        type:String
    },
    age:
    {
        type:String
    },
    token:
    {
        type:String,
        default:''
    }
},
    {timestamps:true})

    const User= mongoose.model('User',userSchema)

    module.exports =User


