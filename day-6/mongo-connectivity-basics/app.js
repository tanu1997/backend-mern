// import the connector

const mongoose = require('mongoose');

 /*try to get connected with the mongo (community) server running on the 
-port : 27017
-host : localhost
-db   : test */
 

//mongoose.connect('mongodb://localhost:27017/test'); //create single connection only
mongoose.connect('mongodb://127.0.0.1/test');
mongoose.set('debug', true);

'Mongoose is ODM'
'JS object is mapped with object data model'

const Cat = mongoose.model('Cat',{name:String , isBig:Boolean }); //Model name Cat 

// actual data
const kitty = new Cat({ name: 'Tanupriya' , isBig: false});  //Create object Kitty


/* mongoose will convert save call to the db insert query*/
kitty.save()
    .then( () => console.log('Cat Saved') )
    
    .catch( err => console.log('There is error') )
   // .finally(() => mongoose.disconnect()) //need to disconnect only once

//   Cat.find((err,cats)=>
//   {
//     if(err) return
//     console.log(cats)
//   })

Cat.find({'isBig':false},{isBig : 0 },(err, cats)=>console.log(cats)).limit(2)
   

