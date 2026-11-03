import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from 'vite-plugin-singlefile'
export default defineConfig(({mode})=>({base:'./',plugins:[vue(),...(mode==='single'?[viteSingleFile()]:[])],build:{outDir:mode==='single'?'singlefile':'dist',assetsInlineLimit:mode==='single'?100000000:4096}}))
