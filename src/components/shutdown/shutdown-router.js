export default {
  path: '/shutdown',
  component: () => import(/* webpackChunkName:"shutdown" */'./shutdown')
}
