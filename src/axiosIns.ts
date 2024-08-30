import axios, { AxiosError } from 'axios';
import { toastInstance } from './main';

const axiosIns = axios.create({
  // Configuración opcional
  baseURL: import.meta.env.VITE_API_URL,
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

// Interceptor para incluir el token de autenticación en cada solicitud
axiosIns.interceptors.request.use(config => {
  const token = import.meta.env.VITE_API_URL_TOKEN

  if (token) {
    // Incluye el token en el encabezado Authorization
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Interceptor para manejar respuestas
axiosIns.interceptors.response.use(response => {
  if (response.status === 201) {
    toastInstance.add({ severity: 'success', detail: 'Guardado con éxito' });
  }
  return response;
}, (error: AxiosError<any>) => {
  if (error.response?.status === 401 || error.response?.status == 400) {
    if(typeof error.response.data.message == 'string') {
      toastInstance.add({ severity: 'error', detail: error.response.data.message , closable: true});
    } else {
      error.response.data.message.forEach((message:string) => {
        toastInstance.add({ severity: 'error', detail: message, closable: true });
      });
    }
  }
  if(error.response?.status === 500) {
    toastInstance.add({ severity: 'error', detail: 'Ups... ocurrio un error inesperado' , closable: true});
  }
  return Promise.reject(error);
});

export default axiosIns;
