import { ElLoading } from 'element-plus'
import { IResultOr } from '../interface'
import airbnb from '@/db'

const storeName = Object.keys(airbnb.recordObjectStore)[0]

// maco 保存浏览数据
export async function saveRecordApi (params: any) {
  const userId = localStorage.getItem('userId')
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0,0,0,.1)'
  })

  // mock 相同订单
  const hasRecordId = await new Promise((resolve, reject) => {
    airbnb.airbnbDB.getList(storeName).then((res: any) => {
      setTimeout(() => {
        loading.close()
      }, 200)
      res && res.forEach((item:any) => {
        if (item.recordId === params.recordId && userId === item.userId) {
          resolve(true)
        }
      })
      resolve(false)
    })
  })
  let result: IResultOr
  if (hasRecordId) {
    result = await new Promise((resolve, reject) => {
      resolve({ code: '000000', success: false, message: '数据已存在', result: null })
    })
  } else {
    Object.assign(params, { userId })
    result = await new Promise((resolve, reject) => {
      airbnb.airbnbDB.updateItem(storeName, params).then((res: any) => {
        setTimeout(() => {
          loading.close()
        }, 200)
        setTimeout(() => {
          resolve({ code: '000000', success: true, message: 'ok', result: res || null })
        }, 500)
      })
    })
  }
  return result
}

// mock 浏览记录查询
export async function getRecordApi () {
  const userId = localStorage.getItem('userId')
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, .2)'
  })
  const result: IResultOr = await new Promise((resolve, reject) => {
    airbnb.airbnbDB.getList(storeName).then((res:any) => {
      setTimeout(() => {
        loading.close()
      }, 200)

      setTimeout(() => {
        res = res.filter((item: any) => {
          return item.userId === userId
        })
        resolve({ code: '000000', success: true, message: 'ok', result: res || null })
      }, 500)
    })
  })
  return result
}
