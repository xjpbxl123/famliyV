/**
 * Created by Amy on 05/02/2018.
 */
export default {
  path: '/popular',
  name: 'popular',
  component: () => import(/* webpackChunkName:"popular" */ './popular')
}
