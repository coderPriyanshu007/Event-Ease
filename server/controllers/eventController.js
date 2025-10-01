

import { fetchAllEvents ,insertEvent,getEventById,updateEvent ,bookEventSeats, getEventAttendees, removeAttendee, removeEvent, getBookedEvents} from '../models/eventModel.js';


export const fetchEvents = async (req, res) => {
  try {
    const events = await fetchAllEvents();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({message:'error Fetching events',error:err.message})
  }
};


export const addEvent = async (req, res) => {
  const eventData = req.body
  try {
    await insertEvent(eventData);
    res.status(201).json({message:'Event added successfully'});
  } catch (err) {
    res.status(500).json({ message: 'Error adding event', error: err });
    console.log(err);
  }
};

export const deleteEvent = async (req,res) => {
  const {id} = req.params;

  try{
    await removeEvent(id);
    res.status(200).json({message:'Event deleted Succesfully'})
  }catch(err){
    res.status(500).json({ message: 'Error deleting event', error: err.message });
    console.log(err);
  }
}


export const fetchEventById = async (req, res) => { 
  const { id } = req.params;
  try {
    const event = await getEventById(id);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching event', error: err.message });
  }
};

export const editEvent = async (req, res) => {
  const { id } = req.params;
  const eventData = req.body; 
  try {
    const updatedEvent = await updateEvent(id, eventData);
    if (updatedEvent) {
      res.status(200).json({ message: 'Event updated successfully', event: updatedEvent }); 
    } else {
      res.status(404).json({ message: 'Event not found' });
    }

  } catch (err) {
    res.status(500).json({ message: 'Error updating event', error: err.message });
    console.log(err);
  } 
};

export  const bookSeats = async (req, res) => {
  const { id } = req.params;
  const { seats } = req.body;
  const userId = req.user.id; 
  try {
    const booking = await bookEventSeats(id, userId, seats);
    res.status(200).json({ message: 'Seats booked successfully', booking });
  } catch (err) {
    res.status(500).json({ message: err.message, error: err.message });
    console.log(err);
  }
};

export const fetchAttendees = async (req, res) => {
  const { id } = req.params;  
  
  try {
    const attendees = await getEventAttendees(id);
    res.status(200).json(attendees);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching attendees', error: err.message });
    console.log(err)
  } 
};

export const deleteAttendee = async (req, res) => { 
  const { attendeeId } = req.params;
  try {
    await removeAttendee(attendeeId);
    res.status(200).json({ message: 'Attendee removed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error removing attendee', error: err.message });
    console.log(err);
  }
};

export const getBookedEventsByUser = async (req,res)=>{
  const {id} = req.user;
  try{
    const events = await getBookedEvents(id);
    res.status(200).json(events);

  }catch(error){
     res.status(500).json({ message: 'Error getting events', error: err.message });
    console.log(err);
  }
}



