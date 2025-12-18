/** @type {import('tailwindcss').Config} */
let tokenExt = {};
try {
  tokenExt = require("./design/tailwind.tokens.cjs");
} catch (e) {
  tokenExt = {};
}

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      ...(tokenExt || {}),
    },
  },
  plugins: [],
};
