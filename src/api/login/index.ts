import { ElLoading } from 'element-plus'
import { IResultOr } from '../interface'
import { getQueryCookie } from '../../utils/util'
import airbnb from '../../db'

const storeName = Object.keys(airbnb.userObjectStore)[0]

// mock 接口 用户注册
export async function userSignApi (params: any) {
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 1)'
  })

  // 是否有相同接口
  const hasMobile = await new Promise((resolve, reject) => {
    airbnb.airbnbDB.getList(storeName).then((res: any) => {
      res.forEach((item: any) => {
        if (item.mobile === params.mobile) {
          resolve(true)
        }
      })
      resolve(false)
    })
  })
  let result: IResultOr
  if (hasMobile) {
    result = await new Promise((resolve, reject) => {
      loading.close()
      resolve({ code: '000001', success: false, message: '数据已存在', result: null })
    })
  } else {
    const obj = { status: 0 }
    Object.assign(params, obj)
    result = await new Promise((resolve, reject) => {
      airbnb.airbnbDB.updateItem(storeName, params).then((res: any) => {
        loading.close()
        resolve({ code: '000000', success: true, message: '操作成功', result: null })
      })
    })
  }
  return result
}

// mock 接口 用户登陆
export async function userLoginApi (params: any) {
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, .1)'
  })
  // 检验手机号和密码是否正确
  const correct: any = await new Promise((resolve, reject) => {
    airbnb.airbnbDB.getList(storeName).then((res: any) => {
      console.log(res)
      res && res.forEach((item:any) => {
        if (item.mobile === params.mobile) {
          if (item.password === params.password) {
            resolve({ code: '000000', userId: item.userId })
          } else {
            resolve({ code: '000002' })
          }
        }
        // if (item.mobile === params.mobile && item.password !== params.password) { // 检验密码
        // } else
        // if (item.mobile !== params.mobile && item.password === params.password) {
        // } else
        // if (item.mobile === params.mobile && item.password === params.password) {
        //   resolve({ code: '000000', userId: item.userId })
        // }
      })
      // 其他
      resolve({ code: '000004' })
    })
  })
  let result: IResultOr
  if (correct.code !== '000000') {
    result = await new Promise((resolve, reject) => {
      resolve({
        code: correct.code,
        success: false,
        message: correct.code === '000002' ? '密码不正确' : correct.code === '000003' ? '手机号不正确' : '不存在该用户，请先注册',
        result: null
      })
    })
  } else {
    const token = (new Date()).getTime() + ''
    document.cookie = `token=${token}`
    const obj = { status: 1, userId: correct.userId, token }
    Object.assign(params, obj)
    result = await new Promise((resolve, reject) => {
      airbnb.airbnbDB.updateItem(storeName, params).then(res => {
        resolve({ code: '000000', success: true, message: '操作成功', result: obj })
      })
    })
  }
  loading.close()
  return result
}

// mock 接口 用户登出
export async function userLogoutApi () {
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, .1)'
  })
  // 根据用户 token 更改登陆状态为 0
  const correct: any = await new Promise((resolve, reject) => {
    airbnb.airbnbDB.getList(storeName).then((res: any) => {
      res && res.forEach((item: any) => {
        const cookie = document.cookie
        const token = getQueryCookie(cookie, 'token')
        if (item.token && item.token.indexOf(token) !== -1) {
          resolve({ userId: item.userId })
        }
      })
      resolve({ code: '000005' })
    })
  })
  let result: IResultOr
  if (correct.code === '000005') {
    result = await new Promise((resolve, reject) => {
      resolve({ code: '000005', success: false, message: '登陆过期', result: null })
    })
  } else {
    const params: any = await new Promise((resolve, reject) => {
      airbnb.airbnbDB.getItem(storeName, correct.userId).then(res => {
        resolve(res)
      })
    })
    const obj = { status: 0, token: null }
    Object.assign(params, obj)
    result = await new Promise((resolve, reject) => {
      loading.close()
      resolve({ code: '000000', success: true, message: '操作成功', result: null })
    })
  }
  return result
}
