// frontend/src/api/index.js
const isLocalDevelopment = process.env.NODE_ENV === 'development';

// Set the backend URL based on the environment
export const HOST = isLocalDevelopment
  ? "http://localhost:3000" // Local development URL
  : "https://ecommerce-app-backend-kwni.onrender.com"; // Render deployment URL