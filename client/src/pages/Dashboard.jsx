import { useState } from "react";
import { useEffect } from "react";
import { fetchEvents } from "../api/events";
import EventListing from "../components/EventListing";
import { Link } from "react-router-dom";
export default function Dashboard() {
    const [events, setEvents] = useState([]);
  
    useEffect(()=>{
      const loadEvents = async()=>{
        try{
          const events = await fetchEvents();
          setEvents(events);
          setLoading(false);
        }catch(err){
          console.error(err.message)
        }
      }
      loadEvents();
    },[])

  const totalEvents = events.length;
  const totalBookings = events.reduce((sum, e) => sum + e.seats_booked, 0);

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <Link to={'/add-event'} className="bg-red-600 text-white px-5 py-2 rounded-lg shadow hover:bg-red-700">
          + Create Event
        </Link>
      </div>

      {/* Stats Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-red-50 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-gray-700">Total Events</h2>
          <p className="text-3xl font-bold text-red-600">{totalEvents}</p>
        </div>
        <div className="bg-red-50 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-gray-700">Total Bookings</h2>
          <p className="text-3xl font-bold text-red-600">{totalBookings}</p>
        </div>
      </div>

      {/* events */}
      <EventListing page={'admin'} />
    </div>
  );
}