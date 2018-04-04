/**
 * Created by moersing on 09/05/2017.
 * environment config file
 */

module.exports = {
  development: {
    http: JSON.stringify({
      root: '' /// For root url of request.
    })
    // Other environment variable go here
  },
  buildTest: {
    http: JSON.stringify({
      root: '' /// For root url of request.
    })
  },
  production: {
    http: JSON.stringify({
      root: '' /// For root url of request.
    })
  }
}
