const mongoose = require('mongoose');
const User = require('./user')
const mySchema = mongoose.Schema;

const questionSchema = new mySchema({

        question:{
            type:String,
            required:true,
            
            
            
        },
       description:{
            type:String,
            required:true,
            
        },
        user_id:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:User,
            }
    
          
    
    },{timestamps:true})


module.exports = mongoose.model('questionSchema', questionSchema);

