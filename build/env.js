/**
 * Created by moersing on 09/05/2017.
 * @description Handle environments for project
 */
let fs = require('fs')
let path = require('path')
let deepMerge = require('deepmerge')
let assign = Object.assign
let NODE_ENV = process.env.NODE_ENV
const environments = ['.env', '.env.local', `.env.${NODE_ENV}`, `.env.${NODE_ENV}.local`]
/**
 * @desc Get project env of Find,
 * We have many environments at runtime, such as dev,test,production etc..,so, That we need an alterable env for switch anytime.
 * @param {Object} [dynamicEnv] - In specify case,May be You want pass some dynamic environment variables on to that for your runtime to getting,Such as APP_VERSION at package.json etc...
 * */
const getEnvironment = (dynamicEnv) => {
  return environments.reduce((initial, envPath) => {
    envPath = path.resolve(process.cwd(), `${envPath}.json`)
    if (fs.existsSync(envPath)) {
      let env = require(envPath)
      try {
        initial.env = deepMerge(initial.env, env)
        Object.keys(initial.env).forEach(key => {
          initial.stringify[key] = JSON.stringify(initial.env[key])
        })
      } catch (e) {
        console.log(e)
      }
    }
    return initial
  }, {stringify: assign({NODE_ENV}, dynamicEnv), env: assign({NODE_ENV}, dynamicEnv)})
}
module.exports = getEnvironment
