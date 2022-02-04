const mongoose = require('mongoose');
const User = require('./user')
const Question = require('./question')
const mySchema = mongoose.Schema;

const cmtSchema = new mySchema({

        comment:{
            type:String,
            required:true,
              
        },
        user_id:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:User,
        },
        question_id:{
            type:mongoose.SchemaTypes.ObjectId,
        ref:Question,
        }

      

},{timestamps:true})

module.exports = mongoose.model('cmtSchema', cmtSchema);
