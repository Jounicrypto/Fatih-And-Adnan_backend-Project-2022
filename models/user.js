const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
const mySchema = mongoose.Schema;

const userSchema = new mySchema({

        username:{
            type:String,
            required:true,
            // minength:3,
            
        },
        email:{
            type:String,
            required:true,
            // unique:true,
        },
        password:{
            type:String,
            required:true,
            // minlength:6,
        },
        created_at:{
            type:Date,
            default:Date.now()
        }

})

module.exports = mongoose.model('userSchema', userSchema);
