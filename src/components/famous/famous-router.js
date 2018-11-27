export default {
  path: '/famous',
  name: 'famous',
  component: () => import(/* webpackChunkName: "famous" */'./famous')
}
