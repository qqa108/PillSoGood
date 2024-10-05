// import { VitePWA } from 'vite-plugin-pwa';
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//     plugins: [
//         react(),
//         VitePWA({
//             strategies: 'injectManifest',
//             srcDir: 'src',
//             filename: 'sw.js',
//             registerType: 'autoUpdate',
//             injectRegister: false,

//             pwaAssets: {
//                 disabled: false,
//                 config: true,
//             },

//             manifest: {
//                 name: 'frontend',
//                 short_name: 'frontend',
//                 description: 'frontend',
//                 theme_color: '#ffffff',
//             },

//             injectManifest: {
//                 globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
//             },

//             devOptions: {
//                 enabled: false,
//                 navigateFallback: 'index.html',
//                 suppressWarnings: true,
//                 type: 'module',
//             },
//         }),
//     ],
//     resolve: {
//         alias: {
//             '@': '/src', // '@'를 src 폴더의 절대 경로로 설정
//         },
//     },
// });

import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      VitePWA({
        strategies: 'injectManifest',
        srcDir: 'src',
        filename: 'sw.js',
        registerType: 'autoUpdate',
        injectRegister: false,

        manifest: {
          name: 'frontend',
          short_name: 'frontend',
          description: 'frontend',
          theme_color: '#ffffff',
        },

        injectManifest: {
          globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        },

        devOptions: {
          enabled: false,
          navigateFallback: 'index.html',
          suppressWarnings: true,
          type: 'module',
        },
      }),
    ],
    server: {
        proxy: {
          '/api': {
            target: 'https://k683g2ohlu.apigw.ntruss.com',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),  // '/api'를 타겟 URL로 재작성
            secure: true,  // HTTPS 연결시 인증서 관련 문제 무시
          },
        },
      },
    resolve: {
      alias: {
        '@': '/src', // '@'를 src 폴더의 절대 경로로 설정
      },
    },
  };
});
