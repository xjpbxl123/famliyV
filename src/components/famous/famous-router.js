export default {
  path: '/famous',
  component: () => import(/* webpackChunkName: "famous" */'./famous')
}
