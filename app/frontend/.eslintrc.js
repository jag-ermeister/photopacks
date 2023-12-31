/* eslint-env node */

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    process: 'readonly',
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 'off',
    'no-prototype-builtins': 'off',
    'no-unused-vars': 'warn',
  },
}
