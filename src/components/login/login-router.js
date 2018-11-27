/**
 * Created by moersing on 09/06/2017.
 */
export default {
  path: '/login',
  name: 'login',
  component: () => import(/* webpackChunkName:"login" */ './login')
}
