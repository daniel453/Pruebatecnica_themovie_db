import { defineStore } from 'pinia';
import axiosIns from '../axiosIns';


export interface form {
    email: null | string,
    password: null | string,
    remember_me: boolean,
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    form: {
        email: null,
        password: null,
        remember_me: false,
    } as form,
    loading: {
        save: false
    }
  }),
  actions: {
    setToken(newToken: string) {
      this.token = newToken;
    },
    clearToken() {
      this.token = null;
    },
    async login() {
        try {
          this.loading.save = true
          await axiosIns.post('auth/login',this.form)
        } catch (error) {
          
        } finally {
          this.loading.save = false
        }

    }
  },
  persist: true
});
