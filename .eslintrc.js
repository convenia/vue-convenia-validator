module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue-libs/recommended"],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    'indent': ['error', 2, {
      'flatTernaryExpressions': true
    }],

    'curly': 'off',
    'no-undef': 'off',
    'camel_case': 'off',
    'comma-style': 'off',

    'array-bracket-spacing': ['error', 'always'],
    'experimentalDecorators': 'on'
  },
  parserOptions: {
    parser: 'typescript-eslint-parser'
  }
}
