import axios from "axios";


const BASE_URL = import.meta.env.VITE_API_URL || "/api/events";

export const fetchEvents = async() => {
  try{
    const res = await axios.get(`${BASE_URL}/`);
    return res.data;
  }catch(error){
    throw new Error(error.response?.data?.message) 
  }
}


export const submitEvent = async (eventData) => {
  try {
    const res = await axios.post(`${BASE_URL}/create-event`, eventData);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create event");
  }

}


export const deleteEvent = async (event_id) =>{
  try{
    const res = await axios.delete(`${BASE_URL}/delete-event/${event_id}`)
    return res.data;
  }catch(error){
    throw new Error(error.response?.data?.message || 'failed to delete Event')
  }
}

export const fetchEventById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch event");
  }
}

export const bookEvent = async (id, userId) => {
  try {
    const res = await axios.post(`${BASE_URL}/book/${id}`, { userId });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to book event");
  }
}

export const updateEvent = async (eventData) => {
  try {
    const res = await axios.patch(`${BASE_URL}/edit-event/${eventData.event_id}`, eventData); 
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update event");
  }
}

export const bookEventSeats = async (id, seats,token) => {
  try {
    const res = await axios.post(`${BASE_URL}/book-seats/${id}`, { seats },{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to book seats");
  } 
}

export const getAttendees = async (eventId) => { 
    try{
      const res = await axios.get(`${BASE_URL}/attendees/${eventId}`)
      return res.data;  
    }catch(error){
      throw new Error(error.response?.data?.message)
    }
}

export const removeAttendee = async (attendeeId) => {
  try {
    const res = await axios.delete(`${BASE_URL}/attendees/${attendeeId}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to remove attendee");
  } 
};