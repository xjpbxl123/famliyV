/**
 * Created by moersing on 09/05/2017.
 * environment config file
 */

module.exports = {
  development: {
    NODE_ENV: '"development"',
    http: JSON.stringify({
      root: '' /// For root url of request.
    })
    // Other environment variable go here
  },
  devTest: {
    NODE_ENV: '"devTest"',
    http: JSON.stringify({
      root: '' /// For root url of request.
    })
  },
  production: {
    NODE_ENV: '"production"',
    http: JSON.stringify({
      root: '' /// For root url of request.
    })
  }
}
