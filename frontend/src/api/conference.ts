import axios from 'axios';
import { BACKEND_URL } from '@/lib/constants';

export const createRoom = async (token: string) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/conference/create`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const joinRoom = async (token: string, channelName: string) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/conference/join`, { channelName }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}