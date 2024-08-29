/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.js"],
  theme: {
    extend: {
      backgroundImage: {
        'paisaje': "url('/src/img/paisa.jpg')",
      },
    },
  },
  plugins: [],
}

