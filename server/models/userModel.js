import pool from "../config/db.js";

export const getBookedEvents = async (userId) => {
  const {rows} = await pool.query(`
    SELECT e.event_id, e.title, e.category, e.location, e.date, e.capacity, e.description,b.id as booking_id, b.seats as seats_booked
    FROM events e
    JOIN bookings b ON e.id = b.event_id
    WHERE b.user_id = $1
    ORDER BY e.id DESC
  `, [userId]);
  return rows;
}

export const removeBooking = async (userId, bookingId) => {
  const now = new Date();
  const {rows} = await pool.query(`
    SELECT e.date
    FROM events e
    JOIN bookings b ON e.id = b.event_id
    WHERE b.user_id = $1 AND b.id = $2
  `, [userId, bookingId]);

  if (rows.length === 0) {
    throw new Error("Booking not found");
  }

  const eventDate = new Date(rows[0].date);
  if (eventDate <= now) {
    throw new Error("Event has started or ongoing");
  }
  await pool.query('DELETE FROM bookings WHERE id = $1 AND user_id = $2', [bookingId, userId]);
  
}