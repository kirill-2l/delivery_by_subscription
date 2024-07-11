import type { SignInPayload } from '@/services/auth/auth.service';
import { authService } from '@/services/auth';
import type { User } from '@/entities/user/user';
import { USER_LS_KEY } from '@/shared/const/cookie';
import { defineStore } from 'pinia';

interface UserStoreState {
  user?: User;
}

const initialState = (): UserStoreState => {
  const user = JSON.parse(localStorage.getItem(USER_LS_KEY) || '');
  return {
    user: user,
  };
};

export const useUserStore = defineStore('user', {
  state: (): UserStoreState => initialState(),
  actions: {
    async signIn(payload: SignInPayload) {
      try {
        const res = await authService.signIn(payload);
        this.user = res;
      } catch (err) {
        this.user = undefined;
        throw err;
      }
    },
    // async signUp(payload: RegisterPayload) {
    //   try {
    //     const res = await authService.register(payload);
    //   } catch (err) {
    //     this.user = null;
    //   }
    // },
  },
  getters: {
    isLoggedIn: (state) => {
      console.log(state.user);
      return !!state.user;
    },
  },
});
