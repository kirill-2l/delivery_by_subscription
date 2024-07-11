import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class ApiService {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: '/api',
      // baseURL: process.env.BASE_URL,
    });
  }

  get<R>(url: string, config: AxiosRequestConfig) {
    return this.instance.get<R>(url, config);
  }

  post<T, R>(url: string, data: T, config: AxiosRequestConfig = {}) {
    return this.instance.post<T, R>(url, data, config);
  }

  put<T, R>(url: string, data: T, config: AxiosRequestConfig = {}) {
    return this.instance.put<R>(url, data, config);
  }

  patch<T, R>(url: string, data: T, config: AxiosRequestConfig = {}) {
    return this.instance.patch<R>(url, data, config);
  }

  delete<R>(url: string, config: AxiosRequestConfig = {}) {
    return this.instance.delete<R>(url, config);
  }
}

export default new ApiService();
