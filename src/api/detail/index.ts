
import { http } from '@/utils/http'
import { IResultOr, IRoomDetailParams } from '@/api/interface'
// import IndexedDB from '@/utils/indexedDB'

// 真实接口 首页房屋详情接口
export function fetchRoomDetail (params: IRoomDetailParams):Promise<IResultOr> {
  return http.httpRequestGet('/api/room/room/getRoomDetail', params)
}
