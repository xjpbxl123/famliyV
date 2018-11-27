export default {
  path: '/shutdown',
  name: 'shutdown',
  component: () => import(/* webpackChunkName:"shutdown" */'./shutdown')
}
