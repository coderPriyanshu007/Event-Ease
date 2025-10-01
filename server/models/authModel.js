// backend/models/authModel.js
import pool from '../config/db.js';

// Create a new user
export const createUser = async ({ username, email, password, role }) => {
  const query = `
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, role
  `;
  const values = [username, email, password, role];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Find user by email
export const findUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const result = await pool.query(query, [email]);
  return result.rows[0];
};
