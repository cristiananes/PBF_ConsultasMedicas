/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            keyframes: {
                fadeIn: {
                    '0%': { opacity: 0, transform: 'translateY(-20px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
                slideIn: {
                    '0%': { opacity: 0, transform: 'translateX(-30px)' },
                    '100%': { opacity: 1, transform: 'translateX(0)' },
                },
            },
            animation: {
                fadeIn: 'fadeIn 2s ease-in-out',
                slideIn: 'slideIn 1.5s ease-in-out',
            },
            colors: {
                ultraviolet: '#52489C',
                trueblue: '#4062BB',
                eggblue: '#59C3C3',
                silver: '#B5B1B2',
                jet: '#2D2D2A',
                azulclaro: '#DDEBF7',
                azulmedianoche: '#4062BB',
                azulpastel: '#59C3C3',
                grisclaro: '#B0BEC5',
            },
        },
    },
    plugins: [],
};
