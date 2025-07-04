import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getToken } from './token';
import { DetailMessageType } from './type';
import { BASE_URL, SERVER_TIMEOUT, StatusCodeMapping } from './const';

const shouldDisplayError = (response: AxiosResponse) => !StatusCodeMapping[response.status];

function createAPI(processErrorHandle: (message: string) => void): AxiosInstance {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: SERVER_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['X-Token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response) {
        if (shouldDisplayError(error.response)) {
          const errorMessage = error.response.data;
          const message = errorMessage.details?.[0]?.messages || errorMessage.message;
          processErrorHandle(message);
        }
      }
      throw error;
    }
  );

  return api;
}

export default createAPI;
