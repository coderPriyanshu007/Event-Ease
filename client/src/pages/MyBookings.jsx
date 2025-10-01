import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext"; 
import { toast } from "react-toastify";
import { fetchBookedEventsByUser } from "../api/user";

const MyBookings = () => {
  const { token } = useAuth(); 
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await fetchBookedEventsByUser( token);
        setBookings(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    
      fetchBookings();
    
  }, [token]);

  if (loading) {
    return <div className="text-center py-10 text-gray-600">Loading bookings...</div>;
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
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {event.title}
            </h3>
            <p className="text-sm text-gray-600 mb-1">
              📅 {new Date(event.date).toLocaleDateString()}
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
