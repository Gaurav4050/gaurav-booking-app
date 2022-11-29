const express = require("express")
const Router= express.Router();

const {updateUser,getUser,getUsers,deleteUser}= require('../controller/user');
const { verifyToken,verifyUser,verifyAdmin} = require("../utils/verifyToken");

Router.get('/checktoken',verifyToken , (req,res,next)=>{
    res.send("<h1> hello user you are logged in <h1/>")
})
Router.get('/checktoken/:id', verifyUser, (req,res,next)=>{
    res.send("<h1> hello user you can delete your account <h1/>")
})
Router.get('/checkadmin/:id', verifyAdmin, (req,res,next)=>{
    res.send("<h1> hello user you are admin <h1/>")
})

Router.get('/:id', verifyUser, getUser)

Router.get('/', getUsers)

Router.delete('/:id', deleteUser)

Router.put('/:id', verifyUser, updateUser)

module.exports=Router