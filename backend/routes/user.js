const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuth = require("../middleware/isAuth");

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
    //3-create the new user
    user = new User({
      fullname:fullname,
      adress:adress,
      email: email,
      phone:phone,
      password: hashedPassword,
      usertype:usertype
    });
    //4 save the user in the db
    await user.save();
    //step 2: create a token (auth)

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

module.exports = router;
