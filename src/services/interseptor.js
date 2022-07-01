import axios from "axios";
import { API_BASE_URL } from "../config/AppConfig";

const service = axios.create({
    baseURL: API_BASE_URL,
    timeout: 60000,
    withCredentials: true
});

export default service;