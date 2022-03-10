const express = require("express");
const Publi = require("../models/poste");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuth = require("../middleware/isAuth");
const multer=require("multer")
const fs=require("fs");



//@role: register post
//@url: http://localhost:5000/api/poste/addposte
//@public
router.post("/addposte", async (req, res) => {
    try {
      //read the payload data from the user
      const {landlord,poste_id, images,title,price,adress,city,state,zip,type,moreFeatures,coordinates } = req.body;
      let pub = new Publi({
        landlord:landlord,
        poste_id:poste_id,
        images:images,
        title:title,
        price: price,
        adress:adress,
        city: city,
        state:state,
        zip:zip,
        type:type,
        moreFeatures:moreFeatures,
        coordinates:coordinates
      });
      //4 save the user in the db
      await pub.save();
      //step 2: create a token (auth)
  
      res.status(200).json({ pub });
    } catch (error) {
      res.status(500).json({ msg: "catch", msg: error.message });
    }
  });



const filestorageengine=multer.diskStorage({
  destination:(req,file,cb)=>{
    let dir=__dirname+`./../../public/images/imagesfor${req.headers.fullname+req.headers.id}/imagesforpost${req.headers.poste_id}`
    if (!fs.existsSync(dir)){
      fs.mkdirSync( dir);};
    cb(null,dir);
  },
  filename:(req,file,cb)=>{
    cb(null,file.originalname);
  }
})
const upload = multer({storage:filestorageengine}).array("multi-files",10)
//@role :upload poste image
//@url:http://localhost:5000/api/poste/posteimages
router.post("/posteimages", async(req,res)=>{
  upload(req,res,function(){
  })
  res.send("file uploaded")
}) 

//@role: get all the postes 
//@url: http://localhost:5000/api/poste//allpostsfor
router.get('/allpostsfor',async(req,res)=>{
  try {
      const publis= await Publi.find()
      res.send(publis)
  } catch (error) {
      res.status(500).json({ msg: "catch", msg: error.message });
  }
})



//@role: get all the postes 
//@url: http://localhost:5000/api/poste/allpostsfor/:id
router.get('/allpostsfor/:id',async(req,res)=>{
  const landlord_id=req.params.id
  try {
      const publis= await Publi.find({landlord: landlord_id})
      res.send(publis)
  } catch (error) {
      res.status(500).json({ msg: "catch", msg: error.message });
  }
})


//@role :Delete poste
//@url:http://localhost:5000/api/poste/deleteposte/:id
router.delete('/deleteposte/:id', async(req,res)=>{
let dir=__dirname+`./../../public/images/imagesfor${req.headers.fullname+req.headers.userid}/imagesforpost${req.headers.poste_id}`
  if (fs.existsSync(dir)){
    fs.rm(dir, { recursive: true }, (err) => {
      if (err) {
          throw err;
      };
  });;
} 
try {
  let tobedeleted= await Publi.findById(req.params.id)
  await Publi.findByIdAndDelete(req.params.id)
  res.status(200).send("poste deleted")
} catch (error) {
  res.status(500).json({ msg: "catch", msg: error.message });
}
})


//@role :find one poste
//@url:http://localhost:5000/api/poste/findposte/:id
router.get('/findposte/:id', async(req,res)=>{
  try {
    let tobefound= await Publi.findById(req.params.id)
    res.status(200).send(tobefound)
  } catch (error) {
    res.status(500).json({ msg: "catch", msg: error.message });
  }
  })



/* //@role :update  poste
//@url:http://localhost:5000/api/poste/editposte/:id
//public/private

*/
router.put("/editposte/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const thenewposte=req.body
    const newposte = await Publi.findByIdAndUpdate(id, {$set: thenewposte })
    res.status(200).json(newposte)
  } catch (error) {res.status(500).json({msg: error.message})}
});


module.exports = router;