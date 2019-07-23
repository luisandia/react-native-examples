module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  plugins: ["react"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  globals: {
    Promise: false
  },
  plugins: ["react"],
  env: {
    browser: true,
    amd: true,
    node: true
  },
  rules: {
    indent: ["off", 2],
    "linebreak-style": ["error", "unix"],
    "react/prop-types": 0,
    quotes: ["warn", "double"],
    semi: ["error", "always"]
  }
};
