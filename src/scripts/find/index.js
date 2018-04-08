
class SDK {
  constructor () {
    /**
     * @desc 初始化SDK
     * @return Promise
     * */
    this.init = () => {
      let app = window.app
      return new Promise(resolve => {
        return app.setup(resolve)
      })
    }
  }
}
export default SDK
