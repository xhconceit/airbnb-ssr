import { fetchRoomList } from '@/api/home/index'
import { fetchRoomDetail } from '@/api/detail/index'
import { IRoomDetailParams, IRoomListParams } from '@/api/interface'
import { saveLanguageApi } from '@/api/layout'
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'

export interface AllStateType {
  count: number,
  locale: any,
  userStatus: number,
  roomList: Array<any>,
  pageNo: number,
  pageSize: number,
  total: number,
  cityCode: string,
  roomDetail: any,
  roomId: any,
  ordervisible: boolean
}

export const key: InjectionKey<Store<AllStateType>> = Symbol('storeKey')

export function createSSRStore () {
  return createStore<AllStateType>({
    state: {
      count: 1,
      locale: null,
      userStatus: 0,
      roomList: [],
      pageNo: 1,
      pageSize: 6,
      total: 0,
      cityCode: 'hz',
      roomDetail: {},
      roomId: null,
      ordervisible: false
    },
    mutations: {
      setCount (state, payload) {
        state.count += payload
        return state.count
      },
      setLanguage (state, payload) {
        state.locale = payload
        return state.locale
      },
      setUserStatus (state, payload) {
        state.userStatus = payload
        return state.userStatus
      },
      setRoomList (state, payload) {
        state.roomList = payload
        return state.roomList
      },
      setPageNo (state, payload) {
        state.pageNo = payload
        return state.pageNo
      },
      setPageSize (state, payload) {
        state.pageSize = payload
        return state.pageSize
      },
      setTotal (state, payload) {
        state.total = payload
        return state.total
      },
      setRoomDetail (state, payload) {
        state.roomDetail = payload
        return state.total
      },
      setRoomId (state, payload) {
        state.roomId = payload
        return state.roomId
      },
      setOrderVisible (state, payload) {
        state.ordervisible = payload
        return state.ordervisible
      }
    },
    actions: {
      saveLanguage ({ commit, state }, language: any) {
        saveLanguageApi(language).then(res => {
          const { success } = res
          if (success) {
            commit('setLanguage', language)
            console.log('set language ok')
          }
        })
      },
      getRoomList ({ commit, state }, payload: IRoomListParams) {
        const { pageNo, cityCode = state.cityCode } = payload
        const params = {
          pageNo,
          pageSize: state.pageSize,
          cityCode
        }
        return new Promise((resolve, reject) => {
          fetchRoomList(params).then(res => {
            const { success, result } = res
            const orders = result.orders
            const total = result.total
            if (success) {
              console.log('保存在store', orders.data)
              commit('setRoomList', orders.data)
              commit('setTotal', total)
              commit('setPageNo', pageNo)
              resolve(true)
            }
          })
        })
      },
      getRoomDetail ({ commit, state }, payload: IRoomDetailParams) {
        return new Promise((resolve, reject) => {
          fetchRoomDetail(payload).then(res => {
            const { success, result } = res
            if (success) {
              console.log('保存在store', result)
              commit('setRoomDetail', result)
              resolve(true)
            }
          })
        })
      }
    }
  })
}

export function useStore () {
  return baseUseStore(key)
}

// export const store = createStore<AllStateType>({
//   state: {
//     count: 1,
//     locale: null,
//     userStatus: 0
//   },
//   mutations: {
//     setCount (state, payload) {
//       state.count += payload
//       return state.count
//     },
//     setLanguage (state, payload) {
//       state.locale = payload
//       return state.locale
//     },
//     setUserStatus (state, payload) {
//       state.userStatus = payload
//       return state.userStatus
//     }
//   },
//   actions: {
//     saveLanguage ({ commit, state }, language: any) {
//       saveLanguageApi(language).then(res => {
//         const { success } = res
//         if (success) {
//           commit('setLanguage', language)
//           console.log('set language ok')
//         }
//       })
//     }
//   }
// })
