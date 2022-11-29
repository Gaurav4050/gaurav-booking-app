const { Room } = require("../models/Room");
const { Hotel } = require("../models/Hotel");
const getRooms = async (req, res, next) => {
  try {
    const data = await Room.find();

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

const getRoom = async (req, res, err) => {
  try {
    const data = await Room.findById(req.params.id);

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

const addRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    const room = new Room(req.body);

    const saveroom = await room.save();

    const data = await Hotel.findByIdAndUpdate(
      hotelId,
      { $push: { rooms: saveroom._id } },
      { new: true }
    );
    console.log(data);

    console.log(saveroom);

    res.status(200).json(saveroom);
  } catch (err) {
    next(err);
  }
};

const deleteRoom = async (req, res, next) => {
  console.log("delete");

  const hotelId = req.params.hotelId;

  try {
    const data = await Room.findByIdAndDelete(req.params.id);

    try {
      const data = await Hotel.findByIdAndUpdate(
        hotelId,
        { $pull: { rooms: req.params.id } },
        { new: true }
      );
      console.log(data);
    } catch (err) {
      next(err);
    }
    res.status(200).json("Data Has Been Removed");
  } catch (err) {
    next(err);
  }
};

const updateRoom = async (req, res, next) => {
  try {
    // const data= await Room.findByIdAndUpdate(req.params.id, req.body,{new:true});
    const data = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    console.log(data);

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
const updateRoomAvailabity = async (req, res, next) => {
  try {
    // const data= await Room.findByIdAndUpdate(req.params.id, req.body,{new:true});
  const data=  await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      { $push: { "roomNumbers.$.unavailableDates": req.body.dates } }
    );
    console.log(data);

    res.status(200).json("Room Status Has Been Updated");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addRoom,
  updateRoom,
  getRoom,
  getRooms,
  deleteRoom,
  updateRoomAvailabity
};
