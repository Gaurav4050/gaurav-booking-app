const express = require("express")
const Router= express.Router();
const {addHotel,updateHotel,getHotel,getHotels,deleteHotel, countByCity, countbytypes, getHotelRoom}= require('../controller/hotel');
const { verifyAdmin } = require("../utils/verifyToken");

// For creating a hotel entry
// Router.post('/', verifyAdmin ,addHotel)
Router.post('/' ,addHotel)

Router.get('/find/:id', getHotel)

Router.get('/',getHotels)

Router.delete('/:id',deleteHotel)

Router.put('/:id', verifyAdmin, updateHotel)

Router.get('/countbycity',countByCity);

Router.get('/countbytype',countbytypes)

Router.get('/getroom/:id',getHotelRoom)


module.exports=Router