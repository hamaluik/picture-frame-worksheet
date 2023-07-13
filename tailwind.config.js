/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'media',
    content: [
	"./index.html",
	"./src/**/*.{js,ts,jsx,tsx}",
    ],
    plugins: [require('@tailwindcss/forms')],
    theme: {
	extend: {},
    },
}
