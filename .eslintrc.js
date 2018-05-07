let NODE_ENV = process.env.NODE_ENV
let isDev = NODE_ENV === 'development'
module.exports = {
  'extends': [
    'plugin:vue/essential',
    'standard'
  ],
  'plugins': [
    'vue'
  ],
  'parserOptions': {
    'parser': 'babel-eslint',
    'ecmaVersion': 6,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true
    }
  },
  'env': {
    'browser': true

  },
  'rules': {
    'no-debugger': isDev ? 'off' : 'error',
    'indent': 'off',
    'no-var': 'error',
    'vue/script-indent': [
      'error',
      2,
      {
        'baseIndent': 1,
        'switchCase': 1
      }
    ]
  }
}
