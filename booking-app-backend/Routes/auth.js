const express = require("express");
const Router = express.Router();
const { User } = require("../models/User.js");

const {Login , Register} = require('../controller/auth')


Router.post("/login", Login);

Router.post("/register",Register) ;

module.exports = Router;
