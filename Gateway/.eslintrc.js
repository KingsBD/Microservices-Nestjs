module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'airbnb-base',
    'airbnb-typescript',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'no-unused-vars': 'off',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': ['error'],
    'react/jsx-filename-extension': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
