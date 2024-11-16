import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    extend: {
      dropShadow: {
        cascade: [
          '0px 77.32px 21.83px rgba(0, 0, 0, 0.01)',
          '0px 49.26px 19.95px rgba(0, 0, 0, 0.04)',
          '0px 28.06px 16.84px rgba(0, 0, 0, 0.15)',
          '0px 12.47px 12.47px rgba(0, 0, 0, 0.26)',
          '0px 3.12px 6.86px rgba(0, 0, 0, 0.29)',
        ],
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          "xl": "1140px",
        },
      },
      animation: {
        sliding: "sliding 30s linear infinite",
      },
      keyframes: {
        sliding: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
};
