import axios from 'axios';
import { apiBaseUrl } from 'next-auth/client/_utils';

export interface UserCredentials {
  email: string;
  password: string;
}

const UserRole = {
  USER: 'USER',
} as const;

export interface User {
  id: string;
  email: string;
  name?: null;
  phoneNumber?: string;
  locale?: string;
  avatarImg?: string;
  role: typeof UserRole;
}

export interface Tokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVICE_BASE_URL,
});

export const signin = async (payload: UserCredentials): Promise<Tokens> => {
  return (await axiosInstance.post('/auth/signin', payload)).data;
};

export const signup = async (payload: UserCredentials) => {
  return (await axiosInstance.post('/auth/signup', payload)).data;
};

export const refresh = async (accessToken: string) => {
  return (
    await axios.post(
      '/auth/refresh',
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
  ).data;
};

export const logout = async (accessToken: string) => {
  return (
    await axiosInstance.post(
      '/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
  ).data;
};

export const me = async (accessToken: string): Promise<User> => {
  return (
    await axiosInstance.get('/users/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  ).data;
};
