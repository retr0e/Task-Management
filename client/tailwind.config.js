/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {

    extend: {    
      colors: {
        'color1' : '#C5C9FA',
        'color2' : '#4A4C5C',
        'color3' : '#7278C2',
        'color4' : '#1F2033',
        'color5' : '#060933',
        'color6' : '#3B3D61',
        'orange' : '#F53C00',
      },
    },
  },
  daisyui: {
    themes: [
   
      'forest',

      
    ],
  },
  plugins: [require("daisyui")],
};
