
import pool from '../config/db.js';


export const fetchAllEvents = async () => {
  const { rows } = await pool.query('SELECT * FROM events ORDER BY id DESC');
  return rows;
}



export const insertEvent = async (event) => {
  const { event_id, title, category, location, date, capacity, description } = event;
  const query = `
    INSERT INTO events (event_id, title, category, location, description, date, capacity)
    VALUES ($1, $2, $3, $4, $5, $6,$7)
  `;
  const values = [event_id, title, category, location, description, date, capacity];
  await pool.query(query, values);
}

export const getEventById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
  return rows[0];
}


export const updateEvent = async (id, event) => {
  const { title, category, location, date, capacity, description } = event;
  const query = `
    UPDATE events
    SET title = $1, category = $2, location = $3, date = $4, capacity = $5, description = $6
    WHERE event_id = $7 
    RETURNING *
  `;
  const values = [title, category, location, date, capacity, description, id];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

export const getEventAttendees = async (eventId) => {
  const query = `
    SELECT u.id, u.name, u.email,b.seats 
    FROM users u
    JOIN bookings b ON u.id = b.user_id
    WHERE b.event_id = $1
  `;
  const { rows } = await pool.query(query, [eventId]);
  return rows;
}

export const bookEventSeats = async (eventId, userId, seats) => {

  const event = await pool.query('SELECT * FROM events WHERE id =$1',[eventId]);
  if(event.rows[0].seats_booked === event.rows[0].capacity){
    throw new Error('Event is Full');
  }
  const exists = await pool.query('SELECT * FROM bookings WHERE event_id = $1 AND user_id = $2', [eventId, userId]);
  if(exists.rows.length > 0 ){
    if(exists.rows[0].seats + seats > 2){
      throw new Error('You have already booked maximum seats');
    }else{
      const {rows} = await pool.query('UPDATE bookings SET seats = seats + $1 WHERE event_id = $2 AND user_id = $3 RETURNING seats', [seats, eventId, userId]);
      await pool.query('UPDATE events SET seats_booked = seats_booked + $1 WHERE id = $2', [seats, eventId]);
      return rows[0];
    }
  }else{
    const {rows} = await pool.query('INSERT INTO bookings (event_id, user_id, seats) VALUES ($1, $2, $3) RETURNING seats', [eventId, userId, seats]);
    await pool.query('UPDATE events SET seats_booked = seats_booked + $1 WHERE id = $2', [seats, eventId]);
    return rows[0];
  }

  
}

export const removeAttendee = async (attendeeId) => {
  const booking = await pool.query('SELECT * FROM bookings WHERE user_id = $1', [attendeeId]); 
  if(booking.rows.length > 0){
    const eventId = booking.rows[0].event_id;
    const seats = booking.rows[0].seats;
    await pool.query('DELETE FROM bookings WHERE user_id = $1', [attendeeId]);
    await pool.query('UPDATE events SET seats_booked = seats_booked - $1 WHERE id = $2', [seats, eventId]);
  }
}


export const removeEvent = async(event_id) =>{
  await pool.query('DELETE FROM events where event_id = $1',[event_id]);
}

export const getBookedEvents = async(userId) =>{
  const {rows} = await pool.query(`SELECT e.*
FROM bookings b
JOIN events e ON b.event_id = e.id
WHERE b.user_id = $1
ORDER BY e.date DESC;
`,[userId])
return rows;
}

