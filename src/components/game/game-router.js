/**
 * Created by zx on 12/03/2018.
 */
export default {
  path: '/game',
  name: 'game',
  component: () => import(/* webpackChunkName:"game" */ './game')
}
