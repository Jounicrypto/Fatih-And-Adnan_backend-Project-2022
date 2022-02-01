const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Backend-project-2022')
.then(() =>{
    console.log('DB connected')
})
.catch(err =>{
    console.log(err)
})