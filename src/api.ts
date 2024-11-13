import axios from "axios";

export const axiosConfig = {
    baseURL: "http://localhost:3000"
}

const api = axios.create(axiosConfig)

export { api } 
