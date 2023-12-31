/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundColor: {
        "main-100": "#e7ecec",
        "main-200": "#dde4e4",
        "main-300": "#ced9d9",
        "main-400": "#c0d8d8",
        "main-500": "#0e8080",
        "overlay-30": "rgba(0,0,0,0.3)",
      },
      colors: {
        "main-100": "#e7ecec",
        "main-200": "#dde4e4",
        "main-300": "#ced9d9",
        "main-400": "#c0d8d8",
        "main-500": "#0e8080",
      },
      outlineColor: {
        "font-outline-2": {
          "text-stroke": "2px white",
          "-webkit-text-stroke": "2px white",
        },
        "font-outline-4": {
          "text-stroke": "4px white",
          "-webkit-text-stroke": "4px white",
        },
      },
      flex: {
        3: "3 3 0%",
        4: "4 4 0%",
        6: "6 6 0%",
        7: "7 7 0%",
      },
      screens: {
        1600: "1600px",
      },
      keyframes: {
        "slide-right": {
          "0%": {
            "-webkit-transform": "translateX(-500px)",
            transform: "translateX(-500px)",
          },
          "100%": {
            "-webkit-transform": "translateX(0)",
            transform: "translateX(0)",
          },
        },
        "slide-left": {
          "0%": {
            "-webkit-transform": "translateX(500px)",
            transform: "translateX(500px)",
          },
          "100%": {
            "-webkit-transform": "translateX(0)",
            transform: "translateX(0)",
          },
        },
        "slide-left2": {
          "0%": {
            "-webkit-transform": "translateX(500px)",
            transform: "translateX(500px)",
          },
          "100%": {
            "-webkit-transform": "translateX(0)",
            transform: "translateX(0)",
          },
        },
        "rotate-center": {
          "0%": {
            "-webkit-transform": "rotate(0)",
            transform: "rotate(0)",
          },
          "100%": {
            "-webkit-transform": "rotate(360deg)",
            transform: "rotate(360deg)",
          },
        },
        "rotate-center-pause": {
          "0%": {
            "-webkit-transform": "rotate(360deg)",
            transform: "rotate(360deg)",
            "border-radius": "999999px",
          },
          "100%": {
            "-webkit-transform": "rotate(0)",
            transform: "rotate(0)",
          },
        },
        "scale-up-center": {
          "0%": {
            "-webkit-transform": "scale(1)",
            transform: "scale(1)",
          },
          "100%": {
            "-webkit-transform": "scale(1.1)",
            transform: "scale(1.1)",
          },
        },
        "scale-up-center-full": {
          "0%": {
            "-webkit-transform": "scale(0)",
            transform: "scale(0)",
          },
          "100%": {
            "-webkit-transform": "scale(1)",
            transform: "scale(1)",
          },
        },
        "scale-down-center": {
          "0%": {
            "-webkit-transform": "scale(1.1)",
            transform: "scale(1.1)",
          },
          "100%": {
            "-webkit-transform": "scale(1)",
            transform: "scale(1)",
          },
        },
      },
      animation: {
        "slide-right":
          "slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "slide-left":
          "slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "slide-left2":
          "slide-left2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "rotate-center": "rotate-center 10s linear infinite",
        "rotate-center-pause": "rotate-center-pause 0.2s  linear 2 both",
        "scale-up-center":
          "scale-up-center 0.5s  cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "scale-up-center-full":
          "scale-up-center-full 0.2s  cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "scale-down-center":
          "scale-down-center 0.5s  cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      },
    },
  },
  plugins: [],
};
