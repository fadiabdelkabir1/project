const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = schema({
  fullname: String,
  adress:String,
  email: {
    type: String,
    unique: true,
  },
  phone:Number,
  password:String,
  usertype:String,
  dateCreation:{
      type:Date,
      default:Date.now()
  }
});

module.exports=User=mongoose.model('users',userSchema)
