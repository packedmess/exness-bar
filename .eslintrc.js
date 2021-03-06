/**
 * ESLint config
 * @see https://eslint.org/
 * @see https://eslint.org/docs/rules/
 */
module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  plugins: ['babel', 'react', 'import', 'jsx-a11y'],
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:jsx-a11y/recommended', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    it: 'readonly',
    expect: 'readonly',
    describe: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'react/react-in-jsx-scope': 0,
    'import/order': 2,
    'import/first': 2,
    'import/exports-last': 0,
    'import/no-duplicates': 2,
    'import/default': 2,
    'import/newline-after-import': 2,
    'import/no-absolute-path': 2,
    'import/no-webpack-loader-syntax': 2,
    'import/no-self-import': 2,
    'import/no-cycle': 2,
    'import/no-useless-path-segments': 2,
    'import/no-relative-parent-imports': 2,
    'import/no-deprecated': 2,
    'import/no-mutable-exports': 2,
    'import/max-dependencies': [2, {max: 30}],
    'import/no-extraneous-dependencies': [
      2,
      {devDependencies: false, optionalDependencies: false, peerDependencies: false},
    ],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    eqeqeq: ['error', 'always'],
    camelcase: 'error',
  },
  settings: {
    // eslint-plugin-react settings
    react: {
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      // default to latest and warns if missing
      // It will default to "detect" in the future
    },
    propWrapperFunctions: [],
    linkComponents: [],
  },
};
