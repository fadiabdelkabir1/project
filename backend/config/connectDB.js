const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect(
    "mongodb+srv://fadifadi:fadifadi@finalcluster.ay19h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    () => { try {
        console.log('the DB is connected..');
    } catch (error) {
        console.log(error);
    } });
};
module.exports=connectDB