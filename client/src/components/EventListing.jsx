
import { useState, useEffect } from 'react';
import EventListingComp from './EventListingComp';
import Spinner from './Spinner';
import {fetchEvents} from '../api/events'

const EventListing = ({page = 'homepage'}) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const curDate = new Date();
  useEffect(()=>{
    const loadEvents = async()=>{
      try{
        const events = await fetchEvents();
        page !== 'homepage' ? setEvents(events):setEvents(events.filter((evt)=> curDate<new Date(evt.date)).splice(0,6));
        setLoading(false);
      }catch(err){
        console.error(err.message)
      }
    }
    loadEvents();
  },[])


  return (
    <section className="bg-gray-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-black mb-6 text-center">
          {page === 'homePage' ? 'Upcoming Events': 'Events'}
        </h2>

        {loading ? (<Spinner loading={loading} />) :
          (<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event) =>
              <EventListingComp key={event.id} event={event} page={page} />
            )}
          </div>)
        }


      </div>
    </section>
  )
}

export default EventListing
