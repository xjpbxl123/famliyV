export default {
  path: '/famous-book',
  component: () => import(/* webpackChunkName: "famousBook" */'./famous-book')
}
