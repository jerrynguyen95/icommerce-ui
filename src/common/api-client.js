import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/icommerce/', timeout: 30000, headers: {
    Accept: 'application/json'
  }
});

export default axiosInstance;
