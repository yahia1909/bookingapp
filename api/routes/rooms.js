import express from "express";

import {
  createRoom,
  getRoomsByHotel,
  getRooms,
  getRoom,
  deleteRoom,
  updatedRoom,
  updatedRoomAvailability
} from "../controllers/room.js";


const router = express.Router();


// create room
router.post("/:hotelId", createRoom);


// get rooms by hotel
router.get("/:hotelId", getRoomsByHotel);


// get all rooms
router.get("/", getRooms);


// get one room
router.get("/single/:id", getRoom);


// update room
router.put("/:id", updatedRoom);


// update availability
router.put("/availability/:id", updatedRoomAvailability);


// delete room
router.delete("/:hotelId/:id", deleteRoom);



export default router;
