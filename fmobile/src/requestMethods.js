import axios from 'axios'
const BASE_URL = "https://backend-finantial.herokuapp.com"

const publicRequest = axios.create({
    baseURL: BASE_URL,
    timeout:1000,
    headers: {
        'Content-Type': 'application/json'
    }
}); 

export default publicRequest