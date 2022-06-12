import { defineConfig } from 'vite';
import banner from 'vite-plugin-banner';
import react from '@vitejs/plugin-react';
import critical from 'rollup-plugin-critical';
import viteImagemin from 'vite-plugin-imagemin';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
    server: {
        port: 8080,
    },
    plugins: [
        banner('  ____                            _______             _              \n |  _ \\                          |__   __|           | |             \n | |_) |_   _  __ _  __ _ _   _     | |_ __ __ _  ___| | __ ___ _ __ \n |  _ <| | | |/ _` |/ _` | | | |    | | \'__/ _` |/ __| |/ // _ \\ \'__|\n | |_) | |_| | (_| | (_| | |_| |    | | | | (_| | (__|   <|  __/ |   \n |____/ \\__,_|\\__, |\\__, |\\__, |    |_|_|  \\__,_|\\___|_|\\_\\\\___|_|   \n               __/ | __/ | __/ |                                     \n              |___/ |___/ |___/                                      \n'),
        react(),
        critical({
            criticalUrl: '',
            criticalBase: 'dist',
            criticalPages: [{ uri: '', template: 'index' }],
            criticalConfig: {
                strict: true,
                inline: true
            }
        }),
        viteImagemin({
            gifsicle: {
                optimizationLevel: 3,
                interlaced: true
            },
            optipng: {
                optimizationLevel: 7
            },
            mozjpeg: {
                quality: 20,
                dcScanOpt: 2
            },
            pngquant: {
                quality: [0.8, 0.9],
                speed: 2,
                strip: true
            },
            svgo: {
                plugins: [
                    {
                        name: 'removeViewBox',
                    },
                    {
                        name: 'removeEmptyAttrs',
                        active: false,
                    }
                ]
            }
        }),
        viteCompression({
            algorithm: 'brotliCompress',
            ext: 'br'
        })
    ]
});
