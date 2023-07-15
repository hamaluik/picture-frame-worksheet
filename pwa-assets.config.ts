import { defineConfig } from '@vite-pwa/assets-generator/config'
import { Preset } from '@vite-pwa/assets-generator/config'

const preset: Preset =  {
  transparent: {
    sizes: [64, 192, 512],
    favicons: [[64, 'favicon.ico']]
  },
  maskable: {
    sizes: [512],
    resizeOptions: {
	background: '#111827',
    }
  },
  apple: {
    sizes: [180],
    resizeOptions: {
	background: '#111827',
    }
  }
};

export default defineConfig({
  preset,
  images: [
    'public/favicon.svg',
  ]
})
