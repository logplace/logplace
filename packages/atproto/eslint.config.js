import customConfig from "eslint-config-custom";

const ignores = ["node_modules"];

const eslintConfig = [
  {
    ignores,
  },
  ...customConfig,
];

export default eslintConfig;
