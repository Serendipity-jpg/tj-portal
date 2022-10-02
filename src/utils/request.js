import axios from 'axios';
import proxy from '../config/proxy';
import { ElMessageBox } from 'element-plus';
import  router  from '../router';

const env = import.meta.env.MODE || 'development';
const host = env === 'mock' ? 'https://mock.boxuegu.com/mock/3359' : proxy[env].host; // 如果是mock模式 就不配置host 会走本地Mock拦截
const CODE = {
  LOGIN_TIMEOUT: 1000,
  REQUEST_SUCCESS: 200,
  REQUEST_FOBID: 1001,
};
// 登录异常弹窗处理
let isLogin = true

const instance = axios.create({
  baseURL:  host, // 'http://172.17.2.134/api-test',
  timeout: 1000,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const TOKEN = localStorage.getItem('token'); 
  config.headers = {
    "Content-Type": "application/json",
    "authorization": TOKEN
  }  
  return config
});

instance.defaults.timeout = 5000;

instance.interceptors.response.use(
  (response) => {
    if (response.status === 200 && response.data.code == 401 && isLogin){
      isLogin = false
      localStorage.removeItem('token')
      ElMessageBox.confirm(
        '您的账号登录超时或在其他机器登录，请重新登录或更换账号登录！',
        '登录超时',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '继续浏览',
          type: 'warning',
        }
      )
        .then(() => {
          router.push('/login')
        })
        .catch(() => {
          router.go(0)
        })
      return false 
    }
    if (response.status === 200) {
      const { data } = response;
      if (data.code === CODE.REQUEST_SUCCESS) {
        return data;
      }
    } 
    return response.data;
  },
  (err) => {
    const { config } = err;

    if (!config || !config.retry) return Promise.reject(err);

    config.retryCount = config.retryCount || 0;

    if (config.retryCount >= config.retry) {
      return Promise.reject(err);
    }

    config.retryCount += 1;

    const backoff = new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, config.retryDelay || 1);
    });

    return backoff.then(() => instance(config));
  },
);

export default instance;
