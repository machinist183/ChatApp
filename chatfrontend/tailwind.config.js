/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");
export default {
  content: ["./src/**/*.jsx",
            "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary : "#212A3E",
        secondary:"#F1F6F9",
        tertiary:"#394867",
        quarternery:"#9BA4B5",
        darkPrimary:"#d0c5e8",
        darkSecondary:"#18122B",
        darkTertiary:"#413955",
        darkQuarternery:"#6e6483",
      },
      boxShadow: {
        'button':'0px 0px 50px 5px  rgba(0,0,0,0.2)',
        'button-hover':'0px 0px 30px 5px  rgba(0,0,0,0.3)',
        'box':'0px 0px 50px   rgba(0,0,0,0.1)',
        'box-hover':'0px 0px 30px 5px  rgba(0,0,0,0.2)',
        'darkBox':'0px 0px 50px rgba(255,255,255,0.05)',
        'darkBox-hover':'0px 0px 30px 5px  rgba(255,255,255,0.1)',
        'darkButton':'0px 0px 20px 5px  rgba(255,255,255,0.05)',
        'darkButton-hover':'0px 0px 15px 5px  rgba(255,255,255,0.2)',
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

