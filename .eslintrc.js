let rules = {
  "extends": [
    "plugin:vue/essential",
    "standard"
  ],
  "plugins": [
    "vue"
  ],
  "parserOptions": {
    "parser": "babel-eslint",
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  "env": {
    "browser": true
  },
  "rules": {
    "no-debugger": "off",
    "indent": "off",
    "no-var": "error",
    "vue/script-indent": [
      "error",
      2,
      {
        "baseIndent": 1,
        "switchCase": 1
      }
    ]
  }
}
if (process.env.NODE_ENV !== 'development') {
  rules.rules['no-debugger'] = "error"
}
module.exports = rules
