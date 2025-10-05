import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { deleteBooking, getBookedEventsByUser } from "../controllers/userController.js";

const router = express.Router();

router.get('/booked-events',authenticate,getBookedEventsByUser);
router.post('/cancel-booking',authenticate,deleteBooking);

export default router;