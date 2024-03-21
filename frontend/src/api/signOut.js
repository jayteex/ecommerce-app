// frontend/src/api/signOut.js
import axios from 'axios';
import { HOST } from ".";

export const signOutUserApi = async () => { 
  try {
    await axios.post(`${HOST}/logout`, { withCredentials: true }); 
  } catch (error) {
    throw new Error(`Error signing out: ${error.message}`); 
  }
};
