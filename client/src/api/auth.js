// src/api/auth.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/auth` :  '/api/auth';

// Register user
export const registerUser = async (formData) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/register`, formData);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message);
  }
};

// Login user
export const loginUser = async (formData) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/login`, formData);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message);
  }
};
