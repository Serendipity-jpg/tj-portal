import { defineStore } from 'pinia';
import { TOKEN_NAME } from '@/config/global';
import  store  from '@/store';

const InitUserInfo = {};

export const useUserStore = defineStore('user', {
  id:"userInfo",
  state: () => ({
    token: sessionStorage.getItem(TOKEN_NAME) , // 使用 || 'main_token' 默认token不走权限
    userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
  }),
  persist: {
    enabled: true,
    strategies: [
      { storage: sessionStorage, paths: ["token", "userInfo"] },
    ],
  },
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
      sessionStorage.setItem(TOKEN_NAME, token)
    },
    // 记录登录时获取的用户信息
    async setUserInfo(userInfo) {
      this.userInfo = userInfo;
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
    },
    async logout() {
      sessionStorage.removeItem(TOKEN_NAME);
      sessionStorage.removeItem('userInfo');
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
export function isLogin(token) {
  return !!sessionStorage.getItem(TOKEN_NAME)
}
