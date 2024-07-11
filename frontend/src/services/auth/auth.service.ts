import ApiService from '@/services/api.service';
import type { User } from '@/entities/user/user';

export interface SignInPayload {
  username: string;
  password: string;
}
export interface RegisterPayload {
  email: string;
  password: string;
}

export class AuthService {
  constructor(readonly _http = ApiService) {}
  async signIn(payload: SignInPayload): Promise<User> {
    return this._http.post<SignInPayload, User>('auth/sign-in', payload);
  }
  async register(payload: RegisterPayload): Promise<User> {
    return this._http.post<RegisterPayload, User>('auth/register', payload);
  }
}
