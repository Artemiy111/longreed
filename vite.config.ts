import { fileURLToPath } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from 'vite-plugin-singlefile'

// В single-file сборке шрифты уже встроены в CSS, отдельный preload только плодит лишние файлы
const dropFontPreload = (): Plugin => ({
  name: 'drop-font-preload',
  transformIndexHtml: {
    order: 'pre',
    handler: (html) => html.replace(/<link rel="preload"[^>]*as="font"[^>]*>/g, ''),
  },
})

export default defineConfig(({ mode }) => {
  const single = mode === 'single'
  return {
    base: './',
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    plugins: [vue(), ...(single ? [dropFontPreload(), viteSingleFile()] : [])],
    build: {
      outDir: single ? 'singlefile' : 'dist',
      assetsInlineLimit: single ? 100_000_000 : 4096,
    },
  }
})
