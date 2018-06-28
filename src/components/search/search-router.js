/**
 * Created by Amy on 05/02/2018.
 */
export default {
  path: '/search',
  name: 'search',
  component: () => import(/* webpackChunkName:"serch" */ './search')
}
