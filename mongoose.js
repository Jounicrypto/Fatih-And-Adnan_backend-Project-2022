const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://adnanjo:099485@cluster0.hvrvw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(() =>{
    console.log('DB connected')
})
.catch(err =>{
    console.log(err)
})