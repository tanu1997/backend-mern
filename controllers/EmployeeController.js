const Employee= require('../models/Employee')

const index=(req,res,next)=>
{
    Employee.find()
    .then(response =>
        {
            res.json({
                response
            })
        })

   
    .catch(error=>
        {
            res.json({
                message: 'An error occured!'
            })
        })
}

const show=(req,res,next) =>
{
    let EmployeeID= req.body.EmployeeID
    Employee.findById(EmployeeID)
    .then(response=>
        {
            res.json({
                response
            })
        })

        .catch(error=>
            {
                message:'An error occured!'
            })
}

//add new employee
    const store =(req,res,next)=>
    {
        let Employee= new Employee({
            name: req.body.name,
            designation: req.body.designation,
            email: req.body.email,
            phone: req.body.phone,
            age: req.body.age,  
        })

        employee.save()

        .then(response=>
            {
                res.json({
                    message: 'Employee Added Successfully!'
                })
            })

            .catch(error=>{
                res.json({
                    message: 'An error occured!'
                })
            })
    }

//update employee
const update =(req,res,next)=>
{
    let EmployeeID=req.body.EmployeeID  
    let updateData={
        name : req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age,
    }

    Employee.findByIdAndUpdate(EmployeeID,{$set:updateData})
   .then(() =>
   {
        res.json({
            message:'Employee updated successfully!'
        })
   })
   .catch(error=>
    {
        res.json({
            message:'An error occured!'
        })
    })
    

}


const destroy=(req,res,next)=>
{
    let EmployeeID=req.body.EmployeeID
}
