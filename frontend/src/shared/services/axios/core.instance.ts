import axios from 'axios';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const axiosCoreInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVICE_BASE_URL,
});

let lastSession: Session | null = null;

axiosCoreInstance.interceptors.request.use(async (config) => {
  if (!lastSession) {
    const session = await getServerSession(authOptions);
    lastSession = session;
  }
  if (lastSession) {
    config.headers.Authorization = `Bearer ${lastSession.tokens.access_token}`;
  } else {
    config.headers.Authorization = undefined;
  }
  return config;
});
