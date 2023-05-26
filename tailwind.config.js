/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			backgroundColor: {
				bgHome: '#f8998b',
				bgButton: '#FFBF00',
			},
			colors: ['#F8998B'],
			fontFamily: {
				logo: 'Pangolin, cursive',
				body: "Prompt', sans-serif",
			},
		},
	},
	plugins: [],
};
