/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#28A745", // Main green shade
        primaryLight: "#8BD39E", // Lighter green shade
        primaryDark: "#1C7430", // Darker green shade
        neutralGray: "#F8F9FA", // Light gray
        accentGold: "#FFC107", // Gold for buttons
      },
    },
  },
  plugins: [],
};
