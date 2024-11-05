/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#651fff",
        borderColor: "hsl(214.3 31.8% 91.4%)",
        dark: "hsl(222.86deg 84% 4.9%)",
        textRed: "#f61a3d",
        silver: "#C0C0C0",
      },
    },
  },
  plugins: [],
};
