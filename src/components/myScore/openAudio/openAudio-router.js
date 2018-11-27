/**
 * Created by Amy on 09/04/2018.
 */
export default {
  path: '/openAudio',
  name: 'openAudio',
  component: () => import(/* webpackChunkName:"openAudio" */ './openAudio')
}
