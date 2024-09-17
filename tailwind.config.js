/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      width:{
        '23': '23%',
      },
      height:{
        '200': '145%',
        '65': '66%'
      },
      spacing: {
        '105': ' 1.8rem',
      },backgroundImage: {
        'custom-gradient': 'linear-gradient(28deg, #726bfe 26%, #ea9ff7 100%)',
      }
    },
  },
}

