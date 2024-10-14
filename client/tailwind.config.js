/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 2s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      padding: {
        '1p': '1%',
        '2p': '2%',
        '3p': '3%',
        '4p': '4%',
        '5p': '5%',
        '10p': '10%',
      },
      margin: {
        '1p': '1%',
        '2p': '2%',
        '3p': '3%',
        '4p': '4%',
        '5p': '5%',
        '10p': '10%',
      },
      spacing: {
        '5px': '5px', 
      },
      width: {
        '10vw': '10vw',
        '15vw': '15vw',
        '20vw': '20vw', 
        '25vw': '25vw', 
        '30vw': '30vw', 
        '60vw': '60vw', 
        '70vw': '70vw', 
        '80vw': '80vw', 
        '85vw': '85vw', 
        '90vw': '90vw', 
      },
      height: {
        '10vh': '10vh', 
        '20vh': '20vh', 
        '30vh': '30vh', 
        '40vh': '40vh', 
        '50vh': '50vh', 
        '60vh': '60vh', 
        '70vh': '70vh', 
        '80vh': '80vh', 
        '90vh': '90vh', 
      },
      screens: {
        xs: '480px',
      },
      fontFamily: {
        inter: ['Inter var', 'sans-serif'],
        OurCity: ['OurCity-font', 'sans-serif'],
      },
      boxShadow: {
        card: '0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.2)',
        cardhover: '0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.4)',
      },
    },
  },
  plugins: [],
};