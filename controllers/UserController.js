const User= require('../models/User');

const jwt =require("jsonwebtoken");

const nodemailer= require("nodemailer");

const randomstring= require("randomstring");
const config = require('../config/config');


const sendResetPasswordMail= async(name,email,token)=>
{
    try
    {
     const transporter=   nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:config.emailUser,
                pass:config.emailPassword
            }
        });

        const mailOptions= {
            from:config.emailUser,
            to:email,
            subject:'For reset password',
            html:'<p> Hii '+name+',Please copy the link and <a href="http://127.0.0.1:3000/api/reset-password?token='+token+'">and reset your password </a>'
        }
            transporter.sendMail(mailOptions,function(error,infor){
                if(error)
                {
                    console.log(error);
                }
                else
                {
                    console.log("Mail has been sent:-",info.response);
                }
            });
    }
    catch(error){
        res.status(400).send({success:false,msg:error.message});
    }
}

const forget_password =async(req,res)=>
{
    try{
      const email= req.body
      const userData=await User.findOne({email:req.body.email});

      if(userData)
      {
        const randomString= randomstring.generate();
       
        const data =await User.updateOne({email:email},{$set:{token:randomString}});
        sendResetPasswordMail(userData.name,userData.email,randomString);
        res.status(200).send({success:true,msg:"Please check your inbox of mail and reset your password."})
      }
      else{
        res.status(200).send({success:true,msg:"This email does not exists"});
      }

    }
    catch(error)
    {
        res.status(400).send({success: false,msg:error.message});

    }
}

const store =(req,res,next)=>
    {
        let user= new User({
            name: req.body.name,
            designation: req.body.designation,
            email: req.body.email,
            phone: req.body.phone,
            age: req.body.age,  
        })

        user.save()

        .then(response=>
            {
                res.json({
                    message: 'User Added Successfully!'
                })
            })

            .catch(error=>{
                res.json({
                    message: 'An error occured!'
                })
            })
    }

    const update =(req,res,next)=>
{
    let UserID=req.body.UserID  
    let updateData={
        name : req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age,
    }

    User.findByIdAndUpdate(UserID,{$set:updateData})
   .then(() =>
   {
        res.json({
            message:'User updated successfully!'
        })
   })
   .catch(error=>
    {
        res.json({
            message:'An error occured!'
        })
    })
    

}


    module.exports={
        store,
        update,
        forget_password
    }