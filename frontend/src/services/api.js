import axios from "axios";

const { VITE_BASE_URL } = import.meta.env;

export async function getBiddings(search) {
    const response = await axios.get(`${VITE_BASE_URL}/?search=${search}`);
    return response.data;
}

export async function getBiddingPage(ref) {
    const response = await axios.get(`${VITE_BASE_URL}/bidding/${ref}`);
    return response.data;
}
