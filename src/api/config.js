import axios from 'axios';

export const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
export const geoLocationApiKey = process.env.REACT_APP_GEO_LOCATION_API_KEY;

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_WEATHER_API,
  timeout: 5000,
});

apiClient.interceptors.request.use(
  (config) => {
    config.url += `&appid=${apiKey}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
