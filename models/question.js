const mongoose = require('mongoose');
const mySchema = mongoose.Schema;

const questionSchema = new mySchema({

        question:{
            type:String,
            required:true,
            
            
            
        },
       description:{
            type:String,
            required:true,
            
            
            
        }

})

module.exports = mongoose.model('questionSchema', questionSchema);
