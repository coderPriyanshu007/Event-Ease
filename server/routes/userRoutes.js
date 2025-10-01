import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { getBookedEventsByUser } from "../controllers/userController.js";

const router = express.Router();

router.get('/booked-events',authenticate,getBookedEventsByUser);

export default router;