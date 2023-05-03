import axios from 'axios'

const API_URL = "http://3.225.232.107:31337";

export const api = axios.create({
  baseURL: API_URL,
});
 