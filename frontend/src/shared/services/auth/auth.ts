import ky from 'ky';

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

const authHttpClient = ky.create({
  prefixUrl: process.env.REACT_APP_SERVICE_BASE_URL,
});

export const signin = async (payload: UserCredentials): Promise<Tokens> => {
  return await authHttpClient.post('/auth/signin', { json: payload }).json();
};

export const signup = async (payload: UserCredentials) => {
  return await authHttpClient.post('/auth/signup', { json: payload }).json();
};

export const refresh = async (accessToken: string) => {
  return await authHttpClient
    .post<Tokens>('/auth/refresh', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .json();
};

export const logout = async (accessToken: string) => {
  return await authHttpClient
    .post('/auth/logout', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .json();
};

export const me = async (accessToken: string): Promise<User> => {
  return await authHttpClient
    .get('/users/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .json();
};
