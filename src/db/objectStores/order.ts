import TypeObjectStore from '../type'

const webOrder: TypeObjectStore = {
  keyPath: 'orderId',
  indexs: ['title', 'personNumber', 'pictureUrl', 'price']
}

const orderObjectStore = {
  web_order: webOrder
}
export default orderObjectStore
