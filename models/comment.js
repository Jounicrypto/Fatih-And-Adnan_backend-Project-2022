const mongoose = require('mongoose');
const mySchema = mongoose.Schema;

const cmtSchema = new mySchema({

        comment:{
            type:String,
            required:true,
              
        },
      

})

module.exports = mongoose.model('cmtSchema', cmtSchema);
