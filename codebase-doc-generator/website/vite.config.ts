import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Copy symlinked content directory during build
    async rollupOptions() {
      // Resolve the symlink to get actual content
      const contentSrc = path.resolve(__dirname, 'public/content');
      const stats = fs.lstatSync(contentSrc);

      if (stats.isSymbolicLink()) {
        const realContentPath = fs.readlinkSync(contentSrc);
        const fullRealPath = path.resolve(path.dirname(contentSrc), realContentPath);

        return {
          plugins: [
            {
              name: 'copy-symlinked-content',
              async writeBundle() {
                const dest = path.resolve(__dirname, 'dist/content');
                // Recursively copy content
                await fs.promises.cp(fullRealPath, dest, { recursive: true });
                // Also copy the entire docs directory
                const docsSrc = path.resolve(__dirname, 'public/docs');
                const docsDest = path.resolve(__dirname, 'dist/docs');
                await fs.promises.cp(docsSrc, docsDest, { recursive: true });
              }
            }
          ]
        };
      }
    }
  },
  server: {
    port: 3421,
    open: true,
    fs: {
      // Allow serving files from symlinked content
      allow: ['..']
    }
  },
})
