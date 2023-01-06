import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import md from '../plugin/md';
import docs from '../plugin/docs';

/**
 * @type {import('vite').UserConfig}
 */
export default {
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
      'business/es': path.resolve(__dirname, '../components'),
      business: path.resolve(__dirname, '../components'),
      template: path.resolve(__dirname, '../template')
    }
  },
  base: './',
  server: {
    host: '0.0.0.0',
    open: true,
    hmr: true
  },
  build: {
    outDir: path.resolve(__dirname, '../../../release/doc')
  },
  plugins: [
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
      mergeProps: false,
      enableObjectSlots: false
    }),
    docs(),
    md(),
    vue({
      include: [/\.vue$/, /\.md$/]
    })
  ],
  optimizeDeps: {
    include: [
      '@ant-design/icons-vue',
      'lodash-es',
      'dayjs',
      'vue',
      'vue-router',
      'vue-i18n'
    ]
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
};
