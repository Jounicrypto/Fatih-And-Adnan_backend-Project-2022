const mongoose = require('mongoose');
const mySchema = mongoose.Schema;

const feedSchema = new mySchema({

        name:{
            type:String,
            required:true,
            maxlength:15,
            
            
        },
        message:{
            type:String,
            required:true,
            maxlength:40,
        },
        created_at:{
            type:Date,
            default:Date.now()
        }

})

module.exports = mongoose.model('feedSchema', feedSchema);
