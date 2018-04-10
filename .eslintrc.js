module.exports={
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
    "browser":true
  },
  "rules": {
    "no-debugger": process.env.NODE_ENV==='development'?'off':'error',
    "indent": "off",
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
