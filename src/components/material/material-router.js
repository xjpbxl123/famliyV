export default {
  path: '/material',
  component: () => import(/* webpackChunkName: "material" */'./material')
}
