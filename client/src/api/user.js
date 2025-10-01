import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "/api/user";


export const fetchBookedEventsByUser = async (token) => {
  
  try {
    const res = await axios.get(`${BASE_URL}/booked-events`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(token)
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch booked events"
    );
  }
};
