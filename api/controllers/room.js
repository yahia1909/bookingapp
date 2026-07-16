import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelId;

    if (!hotelId) {
      return next(createError(400, "Hotel ID is required"));
    }

    const newRoom = new Room({
      ...req.body,
      hotelId,
    });

    const savedRoom = await newRoom.save();

    const updatedHotel = await Hotel.findByIdAndUpdate(
      hotelId,
      {
        $push: {
          rooms: savedRoom._id,
        },
      },
      { new: true }
    );

    if (!updatedHotel) {
      return next(createError(404, "Hotel not found"));
    }

    res.status(200).json({
      message: "Room created successfully",
      room: savedRoom,
      hotel: updatedHotel,
    });
  } catch (error) {
    next(error);
  }
};

export const updatedRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

export const updatedRoomAvailability = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findOneAndUpdate(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

export const getRoomsByHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelId);

    if (!hotel) {
      return next(createError(404, "Hotel not found"));
    }

    const rooms = await Room.find({
      _id: { $in: hotel.rooms },
    });

    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelId;
    await Room.findByIdAndDelete(req.params.id);
    await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } });
    res.status(200).json("Room has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};
