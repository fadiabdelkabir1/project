const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuth = require("../middleware/isAuth");
const multer=require("multer")
const fs=require("fs");
const rimraf = require("rimraf");

//@role: testing
//@url: http://localhost:5000/api/user/test
router.get("/test", (req, res) => {
  res.send("it works ..");
});

//@role: register post
//@url: http://localhost:5000/api/user/register
//@public
router.post("/register", async (req, res) => {
  try {
    //read the payload data from the user
    const { fullname,adress, email,phone, password,usertype } = req.body;
    //step1: create the user
    //1-check if the email has an acount already
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ msg: " there is an acount with this email already" });
    }
    if (fullname==""||adress==""||email==""||password==""||usertype==""||phone==null) {
      return res
        .status(400)
        .json({ msg: " please enter your information" });
    }
    //2-create a hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    const deafultpic="/images/defaultphoto.jpg"
    //3-create the new user
    user = new User({
      fullname:fullname,
      adress:adress,
      email: email,
      phone:phone,
      password: hashedPassword,
      profilepic:deafultpic,
      usertype:usertype
    });
    //4 save the user in the db
    await user.save();
    //step 2: create a token (auth)

    var dir=__dirname+`./../../public/images/imagesfor${user.fullname+user._id}`;
    if (!fs.existsSync(dir)){
      fs.mkdirSync( dir);
  }
    const token = jwt.sign(
      { id: user._id, fullname: user.fullname },
      process.env.TOKENKEY
    );

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ msg: "catch", msg: error.message });
  }
});

//@role: login
//@url: http://localhost:5000/api/user/login
//@public
router.post("/login", async (req, res) => {
  try {
    //read the payload data from the user
    const { email, password } = req.body;

    //step1: check if the email has an acount in the plateform
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: " bad credentials (email)" });
    }

    //step 2 : verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ msg: "bad credentials (password)" });
    }

    //create the token
    const token = await jwt.sign({ id: user._id }, process.env.TOKENKEY);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ msg: "catch", msg: error.message });
  }
});

//@role: get auth user
//@url: http://localhost:5000/api/user/authUser
//@private
router.get("/authUser", isAuth, (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500).json({ msg: "catch", msg: error.message });
  }
});


//@role: get all the user 
//@url: http://localhost:5000/api/user/all
router.get('/all',async(req,res)=>{
    try {
        const users= await User.find()
        res.send(users)
    } catch (error) {
        res.status(500).json({ msg: "catch", msg: error.message });
    }
})

//@role: get  the user by id
//@url: http://localhost:5000/api/user/getuser:id
router.get('/getuser:id',async(req,res)=>{
  const id = req.params.id;
  try {
    const theuser= await User.findById(id)
      res.send(theuser)
  } catch (error) {
      res.status(500).json({ msg: "catch", msg: error.message });
  }
})

/* //@role :update  users
//@url:http://localhost:5000/api/user/edit/:id
//public/private

*/
router.put("/edit/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const thenewuser=req.body
    if(thenewuser.password<10)
    {thenewuser.password = await bcrypt.hash(thenewuser.password, 10)}
    const usered = await User.findByIdAndUpdate(id, {$set: thenewuser })
    res.status(200).json(usered)
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//@role :Delete user
//@url:http://localhost:5000/api/user/delete/:id
router.delete('/delete/:id', async(req,res)=>{
  const id=req.params.id
  let userdelete = await User.findById(id);
  let dir=__dirname+`./../../public/images/imagesfor${userdelete.fullname+userdelete._id}`
  if (fs.existsSync(dir)){
    fs.rmdir(dir, { recursive: true }, (err) => {
      if (err) {
          throw err;
      };
  });;
}
  
  await User.findByIdAndRemove(id)
  .then(
    User=>{
          if(userdelete){return res.status(200).json({msg:`the user is deleted ${userdelete}`})}
          else{
              return res.status(404).json({msg:'user not found'})
          } 
      }

  )
  .catch(err=>{return res.status(500).json({error:err})})
}) 

 
const filestorageengine=multer.diskStorage({
  destination:(req,file,cb)=>{
    let dir=__dirname+`./../../public/images/imagesfor${req.headers.fullname+req.headers.id}`
    cb(null,dir);
  },
  filename:(req,file,cb)=>{
    cb(null,req.headers.fullname+req.headers.id+'.jpg');
  }
})
const upload = multer({storage:filestorageengine})
//@role :upload user image
//@url:http://localhost:5000/api/user/profileimage
router.post("/profileimage",upload.single("file"), async(req,res)=>{
  console.log(req.headers.fullname,req.headers.id)
  res.send("file uploaded")
}) 

module.exports = router;
