import { getBookedEvents } from "../models/userModel.js";


export const getBookedEventsByUser = async (req,res)=>{
  const {id} = req.user;
 
  try{
    const events = await getBookedEvents(id);
    res.status(200).json(events);

  }catch(err){
     res.status(500).json({ message: 'Error getting events', error: err.message });
    console.log(err);
  }
}
