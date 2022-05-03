import axios from 'axios';

export const axiosMapillary = axios.create({
  baseURL: `https://graph.mapillary.com`
});

export const axiosOSM = axios.create({
  baseURL: `https://nominatim.openstreetmap.org`
});

