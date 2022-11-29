const express = require("express")
const Router= express.Router();
const {addRoom,updateRoom,getRoom,getRooms,deleteRoom, updateRoomAvailabity}= require('../controller/room');
const { verifyAdmin } = require("../utils/verifyToken");

// For creating a room entry
Router.post('/:hotelId',verifyAdmin, addRoom)

Router.get('/:id',getRoom)

Router.get('/',getRooms)

Router.delete("/:id/:hotelId",verifyAdmin, deleteRoom)

Router.put('/:id',verifyAdmin, updateRoom)
Router.put('/availabiity/:id', updateRoomAvailabity)


module.exports=Router