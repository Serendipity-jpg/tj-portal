import axios from 'axios';
import proxy from '../config/proxy';

const env = import.meta.env.MODE || 'development';

const host = env === 'mock' ? 'https://mock.boxuegu.com/mock/3359' : proxy[env].host; // 如果是mock模式 就不配置host 会走本地Mock拦截

const CODE = {
  LOGIN_TIMEOUT: 1000,
  REQUEST_SUCCESS: 200,
  REQUEST_FOBID: 1001,
};

const TOKEN = localStorage.getItem('token'); 

const instance = axios.create({
  baseURL: host,
  timeout: 1000,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  config.headers = {
    "Content-Type": "application/json",
    "authorization": TOKEN
  }  
  return config
});

instance.defaults.timeout = 5000;

instance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      const { data } = response;
      // console.log(666, data, data.code === CODE.REQUEST_SUCCESS)
      if (data.code === CODE.REQUEST_SUCCESS) {
        return data;
      }
    }
    return response;
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
