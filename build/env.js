/**
 * Created by moersing on 09/05/2017.
 * @description Handle environments for project
 */
let fs = require('fs')
let path = require('path')
let NODE_ENV = process.env.NODE_ENV
let dotEnvExpand = require('dotenv-expand')
const environments = ['.env.local', '.env']
/**
 * @desc Get project env of Find,
 * We have many(special) environments at runtime, such as dev,test,production etc..,so, That we need an alterable env for switch anytime.
 * */
const getEnvironment = () => {
  return environments.reduce((initial, envPath) => {
    envPath = path.resolve(process.cwd(), envPath)
    if (fs.existsSync(envPath)) {
      let envExpand = dotEnvExpand(require('dotenv').config({path: envPath}))
      Object.assign(initial.env, envExpand.parsed)
      for (let [key, value] of Object.entries(envExpand.parsed)) {
        initial.stringify[key] = JSON.stringify(value)
      }
    }
    return initial
  }, {stringify: {NODE_ENV}, env: {NODE_ENV}})
}
module.exports = getEnvironment
