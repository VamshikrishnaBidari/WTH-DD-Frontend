import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: "public",
      filename: 'sw.js',

      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'android-launchericon-192-192.png', 'android-launchericon-512-512.png'],
      
      manifest: {
        name: 'DearDriving',
        short_name: 'DearDriving',
        description: 'Complete driving school management and learning platform',
        theme_color: '#155cff',
        background_color: '#F9F9F9',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        id: 'dear-driving-pwa', // Add unique ID
        lang: 'en', // Add language
        categories: ['education', 'driving'], // Add categories
        icons: [
          {
            src: '/android-launchericon-192-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/android-launchericon-512-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/android-launchericon-512-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      
      devOptions: {
        enabled: false
      }
    })
  ],
  base: "/",
});