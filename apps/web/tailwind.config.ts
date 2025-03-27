import type { Config } from "tailwindcss";
import { radixThemePreset } from "radix-themes-tw";
import radixTailwind from "tailwindcss-radix";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        offwhite: "#f2f0ef",
        white: "#ffffff",
        black: "#000000",
      },
    },
  },
  presets: [radixThemePreset],
  plugins: [
    radixTailwind({
      variantPrefix: "rdx",
    }),
  ],
};
export default config;
