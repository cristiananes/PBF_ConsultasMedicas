/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                ultraviolet: '#52489C',
                trueblue: '#4062BB',
                eggblue: '#59C3C3',
                silver: '#B5B1B2',
                jet: '#2D2D2A',
            },
        },
    },
    plugins: [],
};
