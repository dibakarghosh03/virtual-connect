import { BACKEND_URL } from '@/lib/constants';
import axios from 'axios';


export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/auth/login`, {
            email,
            password
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const signup = async (firstName: string, lastName: string, email: string, password: string) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/auth/signup`, {
            firstName,
            lastName,
            email,
            password
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}