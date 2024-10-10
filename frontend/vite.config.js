import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
                    name: 'Pill So Good',
                    short_name: 'PSG',
                    description: 'Pill is so good!',
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
                    rewrite: (path) => path.replace(/^\/api/, ''),
                    secure: true,
                },
            },
        },
        resolve: {
            alias: {
                '@': '/src',
            },
        },
        build: {
            base: 'https://j11b308.p.ssafy.io/', // 배포 주소 설정
        },
      }),
    ],
    server: {
      host: '0.0.0.0',  // 모든 인터페이스에서 접근 가능하도록 설정
      port: 5173,        // Vite preview 모드의 기본 포트로 5173 설정
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
        '@': '/src',  // '@'를 src 폴더의 절대 경로로 설정
      },
    },
  };
});
