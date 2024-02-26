import { HOST } from ".";

export const getProducts = async() => {
    const response = await fetch(`${HOST}/home`);
    const products = await response.json();
    return products; 
};