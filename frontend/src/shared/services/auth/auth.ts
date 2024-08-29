import { axiosCoreInstance } from '@/shared/services/axios';

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

export const signin = async (payload: UserCredentials): Promise<Tokens> => {
  return (await axiosCoreInstance.post('/auth/signin', payload)).data;
};

export const signup = async (payload: UserCredentials) => {
  return (await axiosCoreInstance.post('/auth/signup', payload)).data;
};

export const refresh = async () => {
  return (await axiosCoreInstance.post('/auth/refresh')).data;
};

export const logout = async () => {
  return (await axiosCoreInstance.post('/auth/logout')).data;
};

export const me = async (accessToken: string): Promise<User> => {
  return (
    await axiosCoreInstance.get('/users/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  ).data;
};
