// frontend/src/api/signUp.js
import { HOST } from ".";

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${HOST}/sign-in`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
