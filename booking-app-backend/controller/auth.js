const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const createError = require("http-errors");
const jwt = require('jsonwebtoken');

const Login = async (req, res, next) => {
  try {
    console.log(req);
    const user = await User.findOne({ username: req.body.username });
    
    console.log(user);

    if (!user) return next(createError(500, "user not found"));

    const check = await bcrypt.compare(req.body.password, user.password);
    if (!check) return next(createError(500, "password or username incorrect"));

    // now we will create jwt to pass some information in the form of hash while we are performing user updation deletion then we check all this thing using jwt

    // sign( { JSON Data }, TOKEN_KEY)
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_TOKEN
    );

    // now i will set this token into cokkies
    // les us do destructuring of user
    const { password, isAdmin, ...others } = user._doc;
    // we can  not show password and IsAdmin detail in json we need to hode them that's why i used this

    res.cookie("access_token", token, {
      httpOnly: true
    })
      .status(200)
      .json({...others,isAdmin});
  } catch (err) {
    next(err);
  }
};

const Register = (req, res, next) => {
  try {
    console.log("hello0");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // const data = new User({
    //   username: req.body.username,
    //   country: req.body.country,
    //   email: req.body.email,
    //   password: hash,
    //   phone: req.body.phone,
    //   city: req.body.city,
    //   isAdmin:req.body.isAdmin
    // });
    const data = new User({
      ...req.body,
      password: hash,
      
    });

    data.save();

    res.status(201).json(data);
  } catch (err){
    next(err);
  }
};

module.exports = {
  Login,
  Register,
};
