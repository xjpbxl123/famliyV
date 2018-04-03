export default {
  path: '/Home',
  component: () => import(/* webpackChunkName: "home" */'./home')
}
