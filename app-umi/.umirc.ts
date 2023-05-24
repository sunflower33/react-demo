import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  fastRefresh: {},
  history: {
    type: "browser"
  },
  proxy: {
    '/api': {
      target: "https://m.maizuo.com/",
      changeOrigin: true,
    }
  }
});
