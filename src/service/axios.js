import axios from 'axios'

export const API = axios.create({
    baseURL: `http://awsback.ddns.net/api/v1/`
})