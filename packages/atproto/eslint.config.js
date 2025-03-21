import customConfig from "eslint-config-custom";

const ignores = ["node_modules", "src/lexicons/*"];

const eslintConfig = [
  {
    ignores,
  },
  ...customConfig,
];

export default eslintConfig;
