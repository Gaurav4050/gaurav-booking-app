const {User}= require('../models/User')

const getUsers = async (req,res,next)=>{
    try{
        console.log('gauravahbambjmnb');
        
        const data= await User.find();

        res.status(200).json(data);
    }
    catch(err){
        next(err);
    }
}

const getUser = async(req,res,next)=>{

    try{
    const data=await User.findById(req.params.id)

        res.status(200).json(data);
    }
    catch(err){
        next(err);

    }
}
 
const deleteUser= async(req,res,next)=>{
    try{
    const data= await User.findByIdAndDelete(req.params.id);

        res.status(200).json(data);
    }
    catch(err){
        next(err);

    }
}

const updateUser = async(req,res,next)=>{
    try{
    const data= await User.findByIdAndUpdate(req.params.id, req.body,{new:true});

        console.log(data);
        
        res.status(200).json(data);
    }
    catch(err){
        next(err);

    }
}

module.exports ={
    updateUser,getUser,getUsers,deleteUser
}