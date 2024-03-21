// frontend/src/api/signUp.js
import axios from 'axios';
import { HOST } from ".";

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${HOST}/sign-up`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};
