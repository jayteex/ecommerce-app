// frontend/src/api/getSession.js
import axios from 'axios';
import { HOST } from ".";

export const fetchSessionData = async () => {
  try {
    const response = await axios.get(`${HOST}/api-session`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error;
  }
};