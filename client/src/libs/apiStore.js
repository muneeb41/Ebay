import axios from "axios";
import { BASE_URL } from "../utils/constants";


const apiStore = axios.create({
    baseURL: BASE_URL
})


export default apiStore;