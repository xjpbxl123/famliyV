export default {
  path: '/material',
  name: 'material',
  component: () => import(/* webpackChunkName: "material" */'./material')
}
