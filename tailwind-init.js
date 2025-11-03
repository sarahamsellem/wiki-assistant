const tailwindcss = require('tailwindcss');
const fs = require('fs');

// Create minimal tailwind.config.js
fs.writeFileSync('tailwind.config.js', `
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: { extend: {} },
  plugins: [],
};
`);

fs.writeFileSync('postcss.config.js', `
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
};
`);

console.log("Tailwind initialized!");
