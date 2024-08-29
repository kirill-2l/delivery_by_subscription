// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultJWT } from 'next-auth/jwt';
import type { UserRole } from '@prisma/client';
import { Tokens, User } from '@/shared/services/auth/auth';

declare module 'next-auth' {
  interface Session {
    tokens: {
      access_token: string;
      refresh_token: string;
      expires_in: number;
    };
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends Tokens {
    tokens: Tokens;
    user: User;
  }
}
