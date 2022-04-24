import axios from 'axios';

export const token = 'MLY|7607577125926499|b725cde7a14e5c9f30f5e9038a585290';

export const axiosInstance = axios.create({
  baseURL: `https://graph.mapillary.com`
});

