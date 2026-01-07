module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ["eslint:recommended"],
  globals: {
    allure: "readonly"  // Ajout pour éviter les warnings ESLint
  },
  rules: {
    "no-unused-vars": "warn",
    "prefer-const": "error",
    eqeqeq: "error",
    semi: ["error", "always"],
  },
};
