import baseConfig from './config/vite.base.config.js';
import devConfig from './config/vite.dev.config.js';
import prodConfig from './config/vite.prod.config.js';

import { defineConfig } from 'vite';
const envResolver = {
  build: () => {
    console.log('\x1b[31m%s\x1b[0m', 'env:production');
    return Object.assign(baseConfig, prodConfig);
  },
  serve: () => {
    console.log('\x1b[36m%s\x1b[0m', 'env:development');
    return Object.assign(baseConfig, devConfig);
  },
};

export default defineConfig(({ command }) => {
  return envResolver[command]();
});
