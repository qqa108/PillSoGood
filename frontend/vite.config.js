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
    };
});
