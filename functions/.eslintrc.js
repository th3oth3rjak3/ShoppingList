module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    "quotes": ["error", "double"],
    "object-curly-spacing": ["error", "always"],
    "indent": ["error", 2],
    "comma-dangle": "off",
  },
  parserOptions: { "ecmaVersion": "latest" },
};
