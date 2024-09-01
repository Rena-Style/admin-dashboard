import axios from 'axios';

const baseURL = 'http://localhost:3021/api/';
export const apiService = axios.create({
  baseURL,
  withCredentials: false,
});
