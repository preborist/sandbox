import axios from 'axios';

import { hosts } from './hosts';

const http = (serviceName: keyof typeof hosts) => {
  const instance = axios.create({
    baseURL: hosts[serviceName],
    withCredentials: false,
  });

  instance.interceptors.response.use(
    response => response,
    error => {
      return Promise.reject(error);
    },
  );

  return instance;
};

export default http;
