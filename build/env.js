/**
 * Created by moersing on 09/05/2017.
 * @description Handle environments for production
 */
let NODE_ENV = process.env.NODE_ENV
const environments = ['.env', `.env.${NODE_ENV}`, `.env.${NODE_ENV}.local`]
module.exports = function getEnv () {
  return environments.reduce((initial, path) => {
    let env = require('dotenv').config({path: path})
    if (!env.error) {
      env.parsed = Object.keys(env.parsed).reduce((initial, key) => {
        initial[key] = JSON.stringify(env.parsed[key])
        return initial
      }, {})
      return Object.assign(initial, env.parsed)
    }
    return initial
  }, {})
}
