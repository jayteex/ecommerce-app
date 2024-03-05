// frontend/src/api/signOut.js
import axios from 'axios';
import { HOST } from ".";

export const signOutUserApi = async () => { // Renamed function to signOutUserApi
  try {
    await axios.post(`${HOST}/logout`); // Updated endpoint URL
  } catch (error) {
    throw new Error(`Error signing out: ${error.message}`); // Throwing error for handling in Logout.jsx
  }
};
