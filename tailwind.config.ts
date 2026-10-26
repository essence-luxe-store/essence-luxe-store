import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        luxe: { black: "#0B0B0B", black2: "#151515", gold: "#D4AF37", goldLight: "#F2D675", cream: "#F5F1E8", gray: "#A6A6A6" }
      },
      fontFamily: { display: ["Playfair Display","serif"], sans: ["Inter","sans-serif"] }
    }
  },
  plugins: []
};
export default config;
