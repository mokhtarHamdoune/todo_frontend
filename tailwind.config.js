const colors = require("tailwindcss/colors");
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      // Build your palette here
      transparent: 'transparent',
      current: 'currentColor',
      white:colors.white,
      black:colors.black,
      gray: colors.trueGray,
      red: colors.red,
      blue: colors.lightBlue,
      yellow: colors.amber,
      green:colors.green
    },
    extend: {
      fontFamily:{
        'tasks':['Righteous', 'cursive'],
        'new-task':['Bungee', 'cursive']
      },
      animation: {
        modal: 'modal 100ms ease-in-out ',
      },
      backgroundImage:theme=>({
        'form-bg':"url('background.png')"
      }),
      keyframes: {
        modal: {
          '0%': { opacity:'0' },
          '100%': { opacity: '10' },
        }
       }
      
    },
  },
  variants: {
    extend: { 
      borderWidth:['hover'],
      borderColor:['hover']
    },
  },
  plugins: [],
}
