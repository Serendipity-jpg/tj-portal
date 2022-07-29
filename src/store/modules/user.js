import { defineStore } from 'pinia';
import { TOKEN_NAME } from '@/config/global';
import  store  from '@/store';

const InitUserInfo = {};

export const useUserStore = defineStore('user', {
  id:"userInfo",
  state: () => ({
    token: localStorage.getItem(TOKEN_NAME) , // 使用 || 'main_token' 默认token不走权限
    userInfo: JSON.parse(localStorage.getItem("userInfo")),
  }),
  persist: {
    enabled: true,
    strategies: [
      { storage: localStorage, paths: ["token", "userInfo"] },
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
      localStorage.setItem(TOKEN_NAME, token)
    },
    // 记录登录时获取的用户信息
    async setUserInfo(userInfo) {
      this.userInfo = userInfo;
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    },
    async logout() {
      localStorage.removeItem(TOKEN_NAME);
      localStorage.removeItem('userInfo');
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
  console.log(localStorage.setItem(TOKEN_NAME, token))
  return localStorage.setItem(TOKEN_NAME, token) != undefined 
}
