module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  env: {
    node: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "airbnb",
    "airbnb-typescript",
    "next/core-web-vitals",
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-use-before-define": 0,
    "react/jsx-filename-extension": [1, { extensions: [".ts", ".tsx"] }], //should add ".ts" if typescript project
    'jsx-a11y/label-has-associated-control': 0,
    'react/jsx-props-no-spreading': 'off',
  },
};
