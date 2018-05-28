/**
 * Created by moersing on 15/05/2017.
 * @desc vue-router configurations file
 */
import index from 'components/index/index-router'
import home from 'components/home/home-router'
import login from 'components/login/login-router'
import famous from 'components/famous/famous-router'
import famousBook from 'components/famous/famous-book/famousBook-router'
import popular from 'components/popular/popular-router'
import scoreSetList from 'components/scoreSetList/scoreSetList-router'
import scoreList from 'components/scoreList/scoreList-router'
import material from 'components/material/material-router'
import staff from 'components/staff/staff-router'
import myScore from 'components/myScore/myScore-router'
import famousPlay from 'components/famous/famous-play/famousPlay-router'
const routers = [
  index,
  home,
  login,
  famous,
  famousBook,
  popular,
  scoreSetList,
  scoreList,
  material,
  famousPlay,
  myScore
]
/// staff是曲谱测试，仅开发环境可用
const NODE_ENV = process.env.NODE_ENV
if (NODE_ENV === 'development') {
  routers.push(staff)
}
export default routers
