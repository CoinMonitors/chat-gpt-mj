import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import { join, resolve } from 'path';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        AutoImport({
            imports: ['vue', 'vue-router'],
            dts: 'src/auto-imports.d.ts',
            eslintrc: {
                enabled: true
            },
            resolvers: [ElementPlusResolver()]
        }),
        Components({
            resolvers: [ElementPlusResolver()]
        })
    ],
    resolve: {
        alias: {
            '@': join(__dirname, 'src')
        }
    },
    server: {
        open: true,
        proxy: {
            '/api/': {
                target: 'http://localhost:3000/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    publicDir: false,
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    // 将pinia的全局库实例打包进 pinia.hash.js，避免和页面一起打包造成资源重复引入
                    if (id.includes(resolve(__dirname, '/src/store/index.ts'))) {
                        return 'pinia';
                    }
                }
            }
        },
        assetsInlineLimit: 2 //类型： number 默认： 4096 (4kb) 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
    }
});
