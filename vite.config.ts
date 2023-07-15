import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { VitePWA } from 'vite-plugin-pwa'
import * as child from "child_process";

const commithash = child.execSync('git rev-parse --short HEAD').toString().trim();
const date = child.execSync('TZ=America/Edmonton date --rfc-3339=seconds').toString().trim();
process.env.VITE_VERSION_STR = commithash + ' / ' + date;

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [preact(), VitePWA({
	registerType: 'autoUpdate',
	includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
	manifest: {
	    name: 'Picture Frame Worksheet',
	    short_name: 'PFW',
	    description: 'A simple tool for calculating picture frame dimensions.',
	    theme_color: '#111827',
	    icons: [
		{
		    src: 'pwa-64x64.png',
		    sizes: '64x64',
		    type: 'image/png'
		},
		{
		    src: 'pwa-192x192.png',
		    sizes: '192x192',
		    type: 'image/png'
		},
		{
		    src: 'pwa-512x512.png',
		    sizes: '512x512',
		    type: 'image/png',
		    purpose: 'any'  
		},
		{
		    src: 'maskable-icon-512x512.png',
		    sizes: '512x512',
		    type: 'image/png',
		    purpose: 'maskable'
		}
	    ]
	}
    })],
})
