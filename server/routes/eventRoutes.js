import express from 'express';
import {addEvent, fetchEvents,fetchEventById,editEvent, bookSeats, fetchAttendees,deleteAttendee,deleteEvent} from '../controllers/eventController.js';
import { authenticate} from '../middlewares/authenticate.js';
import { bookingLogger } from '../middlewares/logger.js';


const router = express.Router();

router.get('/', fetchEvents);
router.post('/create-event',authenticate,addEvent);
router.get('/:id',authenticate,fetchEventById);
router.patch('/edit-event/:id',authenticate,editEvent);
router.post('/book-seats/:id',authenticate,bookingLogger,bookSeats); 
router.get('/attendees/:id',authenticate,fetchAttendees);
router.delete('/attendees/:attendeeId',authenticate,deleteAttendee);
router.delete('/delete-event/:id',authenticate,deleteEvent);


export default router;