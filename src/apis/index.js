/**
 * @desc 设置练琴日历数据
 * */
import {nativeStorage} from 'find-sdk'
export const setPlayCalendar = (key, value) => {
  return nativeStorage.set('playCalendar', value)
}
