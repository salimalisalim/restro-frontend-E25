import axios from "axios";


const instance = axios.create({
    baseURL:'https://restroapp-backend-e25.onrender.com'
});


export default instance;