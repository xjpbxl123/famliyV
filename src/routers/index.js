/**
 * Created by moersing on 15/05/2017.
 * @desc vue-router configurations file
 */
import index from 'components/index/index-router'
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
import softwareUpdate from 'components/softwareUpdate/softwareUpdate-router'
import shutdown from 'components/shutdown/shutdown-router'
import openAudio from 'components/myScore/openAudio/openAudio-router'
import openVideo from 'components/myScore/openVideo/openVideo-router'
import search from 'components/search/search-router'
import indexMore from 'components/indexMore/indexMore-router'
import openImg from 'components/myScore/openImg/openImg-router'
import timbre from 'components/timbre/timbre-router'
import timbreScore from 'components/timbreScore/timbreScore-router'
import game from 'components/game/game-router'
const routers = [
  index,
  login,
  famous,
  famousBook,
  popular,
  scoreSetList,
  scoreList,
  material,
  famousPlay,
  myScore,
  softwareUpdate,
  shutdown,
  search,
  indexMore,
  openImg,
  openAudio,
  openVideo,
  timbre,
  timbreScore,
  game
]
/// staff是曲谱测试，仅开发环境可用
const NODE_ENV = process.env.NODE_ENV
if (NODE_ENV === 'development') {
  routers.push(staff)
}
export default routers
