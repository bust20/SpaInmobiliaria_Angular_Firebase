/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',

  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'mobile': 'repeat(auto-fill, minmax(250px, 1fr))',
        'pc': 'repeat(auto-fill, minmax(600px, 1fr))'
      },

      scale:{
        'logo': '.3'

      },

      container:{


      }
    },
  },
  plugins: [],
}

