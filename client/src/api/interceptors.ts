/* eslint-disable @typescript-eslint/no-explicit-any */

export const requestInterceptor = (config: any) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}

export const responseInterceptor = (response: any) => {
  if (response.error) return response.error;
  return response;
}