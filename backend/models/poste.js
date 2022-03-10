const mongoose = require("mongoose");
const schema = mongoose.Schema;

const posteSchema = schema({
    landlord:Array,
    poste_id:Array,
    images:Array,
    title:String,
    price:String,
    adress:String,
    city:String,
    state:String,
    zip:String,
    type:String,
    moreFeatures:Object,
    coordinates:Object,
    dateCreation:{
      type:Date,
      default:Date.now()
  }
});

module.exports=Publi=mongoose.model('postes',posteSchema)
