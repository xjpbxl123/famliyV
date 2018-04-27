<style lang="scss">
</style>
<script>
  export default {
    name: 'find-img',
    props: {
      beforeImage: {
        type: String,
        default: () => {
          return require('../../../images/default.jpg')
        }
      },
      src: {
        type: String,
        default: () => {
          return require('../../../images/default.jpg')
        }
      },
      errorImage: {
        type: String,
        default: () => {
          return require('../../../images/default.jpg')
        }
      }
    },
    data () {
      return {
        url: this.beforeImage || this.errorImage
      }
    },
    methods: {
      /**
       * 失败
       */
      error () {
        this.url = this.errorImage || this.beforeImage
      }
    },
    render () {
      return (
        <img src={this.url} alt="Find" onError={this.error}></img>
      )
    },
    created () {
      let image = new Image()
      image.src = this.src
      image.onload = () => {
        this.url = this.src
      }
    }
  }
</script>
