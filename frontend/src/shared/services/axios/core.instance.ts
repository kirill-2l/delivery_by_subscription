import axios from 'axios';
import { getSession } from 'next-auth/react';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export const axiosCoreInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVICE_BASE_URL,
});

axiosCoreInstance.interceptors.request.use(async (config) => {
  const session = await getServerSession(authOptions);
  console.log(config.url, session);
  if (session) {
    config.headers.Authorization = `Bearer ${session.tokens.access_token}`;
  }
  return config;
});
