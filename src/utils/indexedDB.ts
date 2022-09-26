class DB {
  private dbName:string // 数据库名字
  private db:any // 数据库对象
  constructor (dbName:string) {
    this.dbName = dbName
  }

  // 打开数据库
  public openStore (stores: any) {
    const request = window.indexedDB.open(this.dbName, 5)
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log('数据库打开成功')
        this.db = event.target.result
        console.log(event)
        resolve(true)
      }
      request.onerror = (event) => {
        console.log('数据库打开失败')
        console.log(event)
        reject(event)
      }
      request.onupgradeneeded = (event) => {
        console.log('数据库升级成功')
        const { result }: any = event.target
        for (const storeName in stores) {
          // 初始化多个ojectStore对象仓库
          const { keyPath, indexs } = stores[storeName]
          if (!result.objectStoreNames.contains(storeName)) {
            // 没有表则新建表
            // keyPath：主键，主键（key）是默认建立索引的属性； autoIncrement：是否自增；createObjectStore会返回一个对象仓库objectStore(即新建一个表)
            const store = result.createObjectStore(storeName, {
              autoIncrement: true,
              keyPath
            })
            if (indexs && indexs.length) {
              indexs.map((v: string) =>
                // createIndex可以新建索引，unique字段是否唯一
                store.createIndex(v, v, { unique: false })
              )
            }
            store.transaction.oncomplete = (e: any) => {
              console.log('创建对象仓库成功')
            }
          }
        }
      }
    })
  }

  // 新增/修改数据库数据
  updateItem (storeName:string, data:any) {
    const store = this.db.transaction([storeName], 'readwrite').objectStore(storeName)
    return new Promise((resolve, reject) => {
      const request = store.put({
        ...data,
        updateTime: new Date().getTime()
      })
      request.onsuccess = (event:any) => {
        console.log('数据写入成功')
        console.log(event)
        resolve(event.target.result)
      }
      request.onerror = (event:any) => {
        console.log('数据写入失败')
        console.log(event)
        reject(event)
      }
    })
  }

  // 删除数据库数据
  deleteItem (storeName:string, key: number|string) {
    const store = this.db.transaction(storeName).objectStore(storeName)
    return new Promise((resolve, reject) => {
      const request = store.delete(key)
      request.onsuccess = (event:any) => {
        console.log('数据删除成功')
        console.log(event)
        resolve(event)
      }
      request.onerror = (event:any) => {
        console.log('数据删除失败')
        console.log(event)
        reject(event)
      }
    })
  }

  // 查询全部数据
  getList (storeName:string) {
    const store = this.db.transaction(storeName).objectStore(storeName)
    return new Promise((resolve, reject) => {
      const request = store.getAll()
      request.onsuccess = (event:any) => {
        console.log('查询全部数据成功')
        console.log(event)
        resolve(event.target.result)
      }
      request.onerror = (event:any) => {
        console.log('查询全部数据失败')
        console.log(event)
        reject(event)
      }
    })
  }

  // 查询某一条数据
  getItem (storeName:string, key: number | string) {
    const store = this.db.transaction(storeName).objectStore(storeName)
    return new Promise((resolve, reject) => {
      const request = store.get(key)
      request.onsuccess = (event:any) => {
        console.log('查询某一条数据成功')
        console.log(event)
        resolve(event.target.result)
      }
      request.onerror = (event:any) => {
        console.log('查询某一条数据失败')
        console.log(event)
        reject(event)
      }
    })
  }
}

export default DB
