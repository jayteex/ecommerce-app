// frontend/src/api/product.js
import { HOST } from ".";

export const getProducts = async() => {
    const response = await fetch(`${HOST}/home`, { withCredentials: true });
    const products = await response.json();
    return products; 
};