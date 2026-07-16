import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updatedHotel,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/VerifyToken.js";

const router = express.Router();

router.post("/", verifyAdmin, createHotel);
router.put("/:id", verifyAdmin, updatedHotel);
router.delete("/:id", verifyAdmin, deleteHotel);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/:hotelId/rooms", getHotelRooms);
router.get("/:id", getHotel);
router.get("/", getHotels);

export default router;