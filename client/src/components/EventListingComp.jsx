import { formatDate } from '../utils/formatDate';
import { FaMapMarker } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { bookEventSeats } from '../api/events';
import { toast } from 'react-toastify';


const EventListingComp = ({ event, page }) => {
  const currentDate = new Date();
  const {token} = useAuth();
  const eventDate = new Date(event.date);
  const [seats, setSeats] = useState(event.seats_booked);
  const [bookedSeats, setBookedSeats] = useState(0);
  const [booking, setBooking] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const status = () => {
    if (currentDate > eventDate) {
      return (<span className='text-gray-600'>completed</span>);
    } else if (currentDate < eventDate) {
      return (<span className='text-green-500'>upcoming</span>);
    } else {
      return (<span className='text-blue-500'>ongoing</span>);
    }
  }


  const handleSubmit = async () => {
    
    try{
      const res = await bookEventSeats(event.id, bookedSeats,token);
      setSeats(seats + bookedSeats);
      setBooking(false);
      setBookedSeats(0);
      toast.success('Booking successful');
    }catch(err){
      console.error(err.message);
      toast.error(err.message);
    }
  }
  

  return (
    <div className="bg-white rounded-xl  shadow-md relative">
      <div className="p-4 h-full flex flex-col justify-between">
        <div className="mb-6">
          <div className='flex flex-row justify-between'>
            <div className="text-gray-600 my-2">{event.category}</div>
            <div>{status()}</div>
          </div>
          <h3 className="text-xl font-semibold">{event.title}</h3>
        </div>

        <div
          className="mb-5">
          {event.description}
        </div>


        <div className='flex flex-col lg:flex-row justify-between lg:items-center'>
          <h3 className="text-indigo-500 mb-2">{formatDate(event.date)}</h3>
          <div className="text-gray-600 mb-2">Seats : {`${seats}/${event.capacity}`}</div>
        </div>
        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-4">
          <div className="text-orange-700 py-4 my-auto">
            <FaMapMarker className='inline text-lg mb-1 mr-1' />
            {event.location}
          </div>
          {
            user && user?.role === 'admin' ? (
              <button
                onClick={() => {
                  navigate(`/event/${event.id}`)
                }}
                className={`h-[36px] bg-red-500 text-white px-4 py-2 rounded text-center text-sm hover:bg-red-600`}
              >
                View Details
              </button>
            ) :

              (
                <div>
                  {
                    booking && (
                      <button onClick={() => setBooking(false)} className='bg-gray-600 text-white px-4 py-2 rounded text-center text-sm mr-2'>
                        cancel
                      </button>
                    )
                  }
                  {
                    booking  ? (
                      <button
                      disabled={bookedSeats === 0}
                      onClick={handleSubmit} className='bg-green-600 text-white px-4 py-2 rounded text-center text-sm'>
                        Confirm
                      </button>
                    ) :
                      (<button
                        onClick={() => {
                          if (!user) {
                            navigate('/auth');
                          } else {
                            setBooking(true);

                          }
                        }}
                        disabled={currentDate >= eventDate}
                        className={`h-[36px] ${currentDate >= eventDate || event.capacity===event.seats ? 'opacity-[0.8] bg-gray-600' : 'opacity-[1] bg-red-500 hover:bg-red-600'}   text-white px-4 py-2 rounded text-center text-sm`}
                      >
                      {event.capacity!==event.seats && currentDate<eventDate ? 'Book Now': 'Bookings Closed'}
                      </button>)
                  }
                </div>
              )
          }

        </div>
        {
          booking && (
            <div>
              <form onSubmit={handleSubmit}>
                <input type="number" 
                value={bookedSeats} 
                onChange={(e) => setBookedSeats(Number(e.target.value))} 
                min={0} 
                max={2} 
                className='w-full bg-gray-100 border p-2' 
                placeholder='Enter No. of Seats' />
              </form>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default EventListingComp;
