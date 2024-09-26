import ky from 'ky';
import { Session } from 'next-auth';

let lastSession: Session | null = null;
export const coreHttpClientInstance = ky.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_URL}api/`,
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  hooks: {
    beforeRequest: [
      (request) => {
        if (lastSession === null) {
          //   const session = await getServerSession(authOptions);
          //   console.info(session);
          //   lastSession = session;
          // }
          // if (lastSession && lastSession.tokens) {
          //   config.headers.Authorization = `Bearer ${lastSession.tokens?.access_token}`;
          // } else {
          //   config.headers.Authorization = undefined;
          // }
          return request;
        }
      },
    ],
  },
});
