// frontend/src/api/signIn.js
import axios from 'axios';
import { HOST } from ".";

export const signInUserApi = async (userData) => {
  try {
    const response = await axios.post(`${HOST}/sign-in`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
    
  } catch (error) {
    throw new Error(error.message);
  }
};


