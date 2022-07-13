import { defineStore } from 'pinia';
import { TOKEN_NAME } from '@/config/global';
import { store } from '@/store';
import { getUserInfo } from "@/api/user"

const InitUserInfo = {
  roles: [],
};

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem(TOKEN_NAME) || 'main_token', // 默认token不走权限
    userInfo: InitUserInfo,
  }),
  getters: {
    getToken: (state) => {
      return state.token;
    },
    getUserInfo: (state) => {
      return state.userInfo;
    },
  },
  actions: {
    // 记录用户token
    async setToken(token) {
      this.token = token;
      localStorage.setItem(TOKEN_NAME, token)
    },
    // 记录登录时获取的用户信息
    async setUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
    async logout() {
      localStorage.removeItem(TOKEN_NAME);
      this.token = '';
      this.userInfo = InitUserInfo;
    },
    async removeToken() {
      this.token = '';
    },
  },
});

export function getToken() {
  return useUserStore(store);
}
