// 项目配置页面
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';

const CWD = process.cwd();

//配置参考 https://vitejs.dev/config/
export default defineConfig((mode) => {
  // const { VITE_BASE_URL } = loadEnv(mode, CWD);
  return {
    base: './',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      svgLoader()
    ],
    server: {
      port: 8088,
      host: '0.0.0.0',
      cors: true,
			open: false,
			hmr: true,
      // proxy: {
      //   '/img-tx': {
      //     target: 'https://wisehub-1312394356.cos.ap-shanghai.myqcloud.com/',
      //     rewrite: (path) => {
      //       console.log(33,path.replace(/^\/img-tx/, ''))
      //       return path.replace(/^\/img-tx/, '')
      //     }
      //   },
      // },
    },
  }
})
