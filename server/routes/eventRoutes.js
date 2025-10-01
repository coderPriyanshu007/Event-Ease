import express from 'express';
import {addEvent, fetchEvents,fetchEventById,editEvent, bookSeats, fetchAttendees,deleteAttendee,deleteEvent,getBookedEventsByUser} from '../controllers/eventController.js';
import { authenticate} from '../middlewares/authenticate.js';
import { bookingLogger } from '../middlewares/logger.js';


const router = express.Router();

router.get('/', fetchEvents);
router.post('/create-event',addEvent);
router.get('/:id',fetchEventById);
router.patch('/edit-event/:id',editEvent);
router.post('/book-seats/:id',authenticate,bookingLogger,bookSeats); 
router.get('/attendees/:id',fetchAttendees);
router.delete('/attendees/:attendeeId',deleteAttendee);
router.delete('/delete-event/:id',deleteEvent);
router.get('/booked-events',authenticate,getBookedEventsByUser)

export default router;