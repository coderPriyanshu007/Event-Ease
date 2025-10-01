
import {useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaMapMarker } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useEffect,useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';

import { deleteEvent, fetchEventById } from '../api/events';
import { formatDate } from '../utils/formatDate';
import AttendeesList from '../components/AttendeesList';




const EventPage = () => {
    const {id} = useParams();
    const {token} = useAuth();
    const [event , setEvent] = useState();
    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        const loadEvent = async()=>{
            try{
                const event = await fetchEventById(id,token);
                setEvent(event)
            }catch(err){
                console.log(err.message);
            }finally{
                setLoading(false)
            }
        }
        loadEvent();
    })

    const handleDelete = async ()=>{
        const confirm = window.confirm("Are you sure you want to delete event?");
        if (!confirm) return;
        const toastId = toast.loading('Deleting....');
        try{
            const res = await deleteEvent(event.event_id,token);
            toast.update(toastId,{render: 'Event Deleted Successfully!'
                ,isLoading:false,
                type:'success'
            });
            navigate('/events');
        }catch(err){
            toast.update(toastId,{render:'Failed to Delete event',isLoading:false,type:'error'})
        }
    }


    return (<>

        <section>
            <div className="container m-auto py-6 px-6">
                <Link
                    to="/events"
                    className=" rounded-md px-3 py-1 border-transparent text-black  inline-flex items-center hover:border-solid  hover:text-red-500 hover:border-red-500 border-2"
                >
                    <FaArrowLeft className='mr-2 ' /> Back
                </Link>
            </div>
        </section>

       {
        loading ? <Spinner loading={loading} /> :
        ( <section className="bg-red-50">
            <div className="container m-auto py-10 px-6">
                <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                    <main>
                        <div
                            className="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
                        >
                            <div className="text-gray-500 mb-4">{event.category}</div>
                            <h1 className="text-3xl font-bold mb-4">
                                {event.title}
                            </h1>
                            <div
                                className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
                            >
                                <FaMapMarker className='text-lg text-orange-700 mr-1' />
                                <p className="text-orange-700">{event.location}</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                            <h3 className="text-indigo-800 text-lg font-bold mb-6">
                                Event Description
                            </h3>

                            <p className="mb-4">
                                {event.description}
                            </p>

                            <h3 className="text-indigo-800 text-lg font-bold mb-2">Date</h3>

                            <p className="mb-4">{formatDate(event.date)}</p>
                        </div>
                        <AttendeesList eventId={event.id} /> 
                    </main>
                      

                    <aside>
                        <div className="bg-white p-6 rounded-lg shadow-md ">
                            <h3 className="text-xl font-bold mb-6">Manage Event</h3>
                            <Link
                                to={`/edit-event/${event.id}`}
                                className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                            >Edit Event</Link>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                                onClick={handleDelete}
                            >
                                Delete Event
                            </button>
                        </div>
                        
                        
                    </aside>
                </div>
            </div>
        </section>)
       }

    </>)
}


export default EventPage;
