import axios from 'axios';
import { GET_USER_URL } from '../constants/appConstants';

export function fetchUser() {
    return axios.get(GET_USER_URL);
}
