const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');

const Cat = mongoose.model('Cat',{name:String}); //Model name Cat 

const kitty = new Cat({ name: 'Tanupriya' });  //Create object Kitty

kitty.save()
    .then( () => console.log('Cat Saved') )
    .catch( err => console.log('There is error') )

