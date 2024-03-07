// frontend/src/api/updateAccount.js
import axios from 'axios';
import { HOST } from ".";

export const updateAccount = async (updatedUserData) => {
    try {
        const response = await axios.put(`${HOST}/update-account`, updatedUserData);
        return response.data;
    } catch (error) {
        throw new Error('Error updating account');
    }
};
