module.exports = {
  extends: 'semistandard',
  env: {
    node: true,
    browser: true,
    mocha: true
  },

  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 2021,
    ecmaFeatures: {
      globalReturn: false,
      jsx: false
    },
    sourceType: 'module'
  },

  plugins: ['import', 'node', 'promise', 'standard']
};
