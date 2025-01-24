import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import customConfig from "eslint-config-custom";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const ignores = ["node_modules", ".next"];

const eslintConfig = [
  {
    ignores,
  },
  ...customConfig,
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
