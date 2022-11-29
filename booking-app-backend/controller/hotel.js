const { Hotel } = require("../models/Hotel");
const { Room } = require("../models/Room");

const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    // const hotels = await Hotel.find({
    //   ...others,
    //   cheapestPrice: { $gt: min || 1, $lt: max || 999999 },
    // }).limit(req.query.limit || 200 );
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 999999 },
    })

    console.log({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999999 },
    });

    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

const getHotel = async (req, res,next) => {
  try {

    console.log(req.params.id);
    
    const data = await Hotel.findById(req.params.id);

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

const addHotel = async (req, res, next) => {
  try {
    const hotel = new Hotel(req.body);

    const savehotel = await hotel.save();

    console.log(savehotel);

    res.status(200).json(savehotel);
  } catch (err) {
    next(err);
  }
};

const deleteHotel = async (req, res, next) => {
  try {
    const data = await Hotel.findByIdAndDelete(req.params.id);

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

const updateHotel = async (req, res, next) => {
  try {
    const data = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    console.log(data);

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

const countByCity = async (req, res, next) => {
  const query = req.query.cities.split(",");

  console.log(query);

  try {
    const list = await Promise.all(
      query.map((item) => {
        return Hotel.countDocuments({ city: item });
      })
    );

    res.status(200).json(list);
  } catch (err) {
    res.status(400).json(`Error here ${err}`);
  }
};

const countbytypes = async (req, res, next) => {
  const query = req.query;
  console.log(query);

  try {
    const hotelCount = await Hotel.countDocuments({ type: "Hotel" });
    const hotelApartments = await Hotel.countDocuments({ type: "Apartments" });
    const hotelResorts = await Hotel.countDocuments({ type: "Resorts" });
    const hotelVillas = await Hotel.countDocuments({ type: "Villas" });
    const hotelCabins = await Hotel.countDocuments({ type: "Cabins" });
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: hotelApartments },
      { type: "resorts", count: hotelResorts },
      { type: "villas", count: hotelVillas },
      { type: "cabins", count: hotelCabins },
    ]);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getHotelRoom = async (req, res, next) => {
  console.log("kmddamsmdmas");
  try {
    const id = req.params.id;

    const data = await Hotel.findById(id);

    const list = await Promise.all(
      data.rooms.map((id) => {
        return Room.findById(id);
      })
    );

    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addHotel,
  updateHotel,
  getHotel,
  getHotels,
  deleteHotel,
  countByCity,
  countbytypes,
  getHotelRoom,
};
