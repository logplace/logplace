module.exports = {
  "**/*.{ts,tsx}": [
    () => {
      return `turbo typecheck`;
    },
    () => {
      return `turbo lint`;
    },
  ],
};
