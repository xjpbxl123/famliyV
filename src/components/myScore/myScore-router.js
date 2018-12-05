/**
 * Created by Amy on 05/04/2018.
 */
export default {
  path: '/myScore',
  name: 'myScore',
  component: () => import(/* webpackChunkName:"myScore" */ './myScore')
}
