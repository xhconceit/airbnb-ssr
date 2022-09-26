import airbnb from '@/db'
import { ElLoading } from 'element-plus'
import { IResultOr } from '../interface'

const storeName = Object.keys(airbnb.orderObjectStore)[0]

// mock 立即预定
export async function saveOrderApi (params: any) {
  const userId = localStorage.getItem('userId')
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0,0,0,.1)'
  })
  // 是否存在相同订单
  const hasOrderId = await new Promise((resolve, reject) => {
    airbnb.airbnbDB.getList(storeName).then((res: any) => {
      setTimeout(() => {
        loading.close()
      }, 200)
      console.log(res, 333)
      res && res.forEach((item: any) => {
        if (item.orderId === params.orderId && item.userId === userId) {
          resolve(true)
        }
      })
      resolve(false)
    })
  })
  let result: IResultOr
  if (hasOrderId) {
    result = await new Promise((resolve, reject) => {
      resolve({ code: '000000', success: false, message: '数据已存在', result: null })
    })
  } else {
    result = await new Promise((resolve, reject) => {
      Object.assign(params, { userId })
      airbnb.airbnbDB.updateItem(storeName, params).then(res => {
        setTimeout(() => {
          loading.close()
        }, 200)
        resolve({ code: '000000', success: true, message: 'ok', result: null })
      })
    })
  }
  return result
}

/// mock 订单接口
export async function fetchOrderApi () {
  const userId = localStorage.getItem('userId')
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0,0,0,.2)'
  })
  const result: IResultOr = await new Promise((resolve, reject) => {
    airbnb.airbnbDB.getList(storeName).then((res:any) => {
      setTimeout(() => {
        loading.close()
      }, 200)
      res = res && res.length > 0 && res.filter((item: any) => {
        return item.userId === userId
      })
      setTimeout(() => {
        resolve({ code: '000000', success: true, message: 'ok', result: res || null })
      }, 1500)
    })
  })
  return result
}
