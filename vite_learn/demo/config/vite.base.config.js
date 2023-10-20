import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    // 对 css 的行为进行配置
    modules: {
      // 对css模块化的默认行为进行覆盖
      // localsConvention: 'camelCase', //"camelCase"| "camelCaseOnly"|"dashes"|"dashesOnly"
    },
    devSourcemap: true,
  },
  optimizeDeps: {
    exclude: ['node_modules'],
  },
});
