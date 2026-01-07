module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
    "jest-allure/globals": true
  },
  extends: ["eslint:recommended"],
  rules: {
    "no-unused-vars": "warn",
    "prefer-const": "error",
    eqeqeq: "error",
    semi: ["error", "always"],
  },
};
