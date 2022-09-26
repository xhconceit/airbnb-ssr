import DB from '../utils/indexedDB' // 引入 indexedDB 工具类
import languageObjectStore from './objectStores/language' // 引入语言类型对象仓库
import userObjectStore from './objectStores/user' // 用户类型对象仓库
import orderObjectStore from './objectStores/order'
import recordObjectStore from './objectStores/record'

// 数据库
export const airbnbDB = new DB('airbnb')

export default {
  airbnbDB,
  languageObjectStore,
  userObjectStore,
  orderObjectStore,
  recordObjectStore
}
