import { getBookedEvents , removeBooking} from "../models/userModel.js";


export const getBookedEventsByUser = async (req,res)=>{
  const {id} = req.user;
 
  try{
    const events = await getBookedEvents(id);
    res.status(200).json(events);

  }catch(err){
     res.status(500).json({ message: 'Error getting events', error: err.message });
  }
}

export const deleteBooking = async (req,res)=>{
  const {id} = req.user;
  const {bookingId} = req.body;

  try{
    await removeBooking(id, bookingId);
    res.status(200).json({message: "Booking cancelled successfully"});
  }catch(err){
    res.status(500).json({message: err.message});
  }
} 