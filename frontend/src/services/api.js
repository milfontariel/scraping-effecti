import axios from "axios";

const { VITE_BASE_URL } = import.meta.env;

export async function getBiddings(search) {
    const response = await axios.get(`${VITE_BASE_URL}/?search=${search}`);
    console.log('data', response.data);
    return response.data;
}