import axios from 'axios';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getSession } from 'next-auth/react';

export const axiosCoreInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVICE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let lastSession: Session | null = null;
axiosCoreInstance.interceptors.request.use(async (config) => {
  console.log('lastSession', lastSession);
  // if (lastSession === null) {
  //   const session = await getServerSession(authOptions);
  //   console.info(session);
  //   lastSession = session;
  // }
  // if (lastSession && lastSession.tokens) {
  //   config.headers.Authorization = `Bearer ${lastSession.tokens?.access_token}`;
  // } else {
  //   config.headers.Authorization = undefined;
  // }
  return config;
});
