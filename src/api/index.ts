import { http } from '@/utils/http'
import { IResultOr } from './interface'
// import IndexedDB from '@/utils/indexedDB'

// 真实接口
export function fetchRoomList (params:any):Promise<IResultOr> {
  return http.httpRequestGet('http://110.42.184.111/api/room/room/getRoomList', params)
}

// // mock
// export async function fetchElephant () {
//   const airbnbDB = new IndexedDB('airbnb')
//   await airbnbDB.openStore('elephant', 'id', ['nose', 'ear'])
//   return await airbnbDB.getList('elephant').then(result => {
//     return {
//       code: '000000',
//       message: 'ok',
//       result,
//       success: true
//     }
//   })
// }
