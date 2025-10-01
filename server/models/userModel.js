import pool from "../config/db.js";

export const getBookedEvents = async (userId) => {
  const {rows} = await pool.query(`
    SELECT e.event_id, e.title, e.category, e.location, e.date, e.capacity, e.description, b.seats as seats_booked
    FROM events e
    JOIN bookings b ON e.id = b.event_id
    WHERE b.user_id = $1
    ORDER BY e.id DESC
  `, [userId]);
  return rows;
}