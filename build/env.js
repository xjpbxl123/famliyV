/**
 * Created by moersing on 09/05/2017.
 * @description Handle environments for production
 */
let fs = require('fs')
let path = require('path')
let NODE_ENV = process.env.NODE_ENV
const environments = ['.env', '.env.local', `.env.${NODE_ENV}`, `.env.${NODE_ENV}.local`]
module.exports = function getEnv () {
  return environments.reduce((initial, envPath) => {
    envPath = path.resolve(process.cwd(), `${envPath}.json`)
    if (fs.existsSync(envPath)) {
      let env = require(envPath)
      try {
        Object.assign(initial, env)
        Object.keys(initial).forEach(key => {
          initial[key] = JSON.stringify(initial[key])
        })
      } catch (e) {
        console.log(e)
      }
    }
    return initial
  }, {})
}
