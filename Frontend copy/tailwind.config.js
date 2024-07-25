/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans Lao', 'sans-serif'],

      },
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden"
          },
          "100%": {
            width: "100%"
          }
        },
        blink: {
          "50%": {
            borderColor: "transparent"
          },
          "100%": {
            borderColor: "white"
          }
        }
      },
      animation: {
        typing: "typing 2s steps(20) infinite alternate, blink .7s infinite"
      }
    },
    colors: {
      primaryColor: "#3E79C9",
      secondaryColor: "#0E98DC",
      textColor: "#226FB7",
      white: "#ffffff",
      bgbg: "#D9D9D9",
      unSelectText: "#625F5F",
      btnn: "#C3C3C3",
      head: "#FFDCC9",
      bgPro: "#F2F2F2",
      textColor: "#0A3F71",
      green:"#74AA9C",


      black: "#000000",
      subTextColor: "#737373",
      lineColor: "#D9D9D9",
      bgColor: "#fafafa",
      scueecssColor: "#33CC33",
      deleteColor: "#BB271A",
      restartColor: "#2A62FF",
      bgHead: "#C6C6C6",

      redBottle: "#FF0000",
      blueBottle: "#2270B8",
      greenBottle: "#49A84D",
      yellowBottle: "#F6BB1D",
      geryBottle: "#3F3F3F",
      scueess: "#A8FFA6",
      watting: "#91B6DB",
      button: "#2F76CC",

    },
  },

  plugins: [],
}