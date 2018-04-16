/**
 * Created by moersing on 09/05/2017.
 * @description Handle environments for project
 */
let fs = require('fs')
let path = require('path')
let NODE_ENV = process.env.NODE_ENV
const environments = ['.env', '.env.local', `.env.${NODE_ENV}`, `.env.${NODE_ENV}.local`]
/**
 * @desc Get project env of Find,
 * We have many environments at runtime, such as dev,test,production etc..,so, That we need an alterable env for switch anytime.
 * */
const getEnvironment = () => {
  return environments.reduce((initial, envPath) => {
    envPath = path.resolve(process.cwd(), `${envPath}.json`)
    if (fs.existsSync(envPath)) {
      let env = require(envPath)
      try {
        Object.assign(initial.env, env)
        for (let [key, value] of Object.entries(initial.env)) {
          initial.stringify[key] = JSON.stringify(value)
        }
      } catch (e) {
        console.log(e)
      }
    }
    return initial
  }, {stringify: {NODE_ENV}, env: {NODE_ENV}})
}
module.exports = getEnvironment
