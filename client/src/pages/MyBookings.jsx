import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext"; 
import { toast } from "react-toastify";
import { fetchBookedEventsByUser } from "../api/user";
import {formatDate} from "../utils/formatDate";
import Spinner from "../components/Spinner";
import { cancelBooking } from "../api/user";

const MyBookings = () => {
  const { token } = useAuth(); 
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentDate = new Date();
 
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await fetchBookedEventsByUser(token);
        setBookings(data);
        
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    
      fetchBookings();
    
  }, []);

  const cancelBookingById = async (bookingId) => {
    const confirm = window.confirm("Are you sure you want to cancel  bookings for this event?"  );
        if (!confirm) return;
    const toastId = toast.loading('Canceling...')
    try {
      await cancelBooking(token, bookingId);
      setBookings((prev) => prev.filter((b) => b.booking_id !== bookingId));
      toast.update(toastId,{
        render:"Booking cancelled successfully",
        isLoading: false,
        type : 'success',
        autoClose:1500
      });
    } catch (err) {
      toast.update(toastId,{
        render:err.message,
        isLoading: false,
        type : 'error',
        autoClose:1500
      });
    }
  }
    


  if (loading) {
    return <div className="text-center py-10 text-gray-600"><Spinner loading={loading} /></div>;
  }

  if (bookings.length === 0) {
    return <div className="text-center py-10 text-gray-600">No bookings yet.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-8">
        My Bookings
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bookings.map((event) => (
          <div
            key={event.event_id}
            
            className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {event.title}
            </h3>
            {currentDate < new Date(event.date) && (
              <button onClick={()=>cancelBookingById(event.booking_id)} className="border text-red-500 hover:bg-red-500 hover:text-white  p-1.5 rounded-md">Cancel booking</button>
            )}
            {currentDate > new Date(event.date) && (
              <span className="text-sm text-gray-500 italic">Completed</span>
            )}
            {
              currentDate === new Date(event.date) && (
                <span className="text-sm text-gray-500 italic">Ongoing</span>
              )
            }
            </div>
            <p className="text-sm text-gray-600 mb-1">
              📅 {formatDate(event.date)}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              📍 {event.location}
            </p>
            <p className="text-sm text-gray-600 mb-3">
              🎟 Seats booked: <span className="font-semibold">{event.seats_booked}</span>
            </p>
            <p className="text-gray-700 text-sm line-clamp-3">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
