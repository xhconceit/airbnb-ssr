<script setup lang="ts">
import { fetchOrderApi } from '@/api/order'
import { useStore } from '@/store'
import { getCurrentInstance, reactive } from 'vue'
import { useRouter } from 'vue-router'

const { proxy }:any = getCurrentInstance()

const store = useStore()
const router = useRouter()

let orderData = reactive<Array<any>>([])

function fetchOrder () {
  return fetchOrderApi().then(res => {
    const { result, success, message } = res
    if (success) {
      orderData = result || []
    } else {
      proxy.$message.error(message)
    }
  })
}
if (store.state.userStatus) {
  await fetchOrder()
} else {
  const { pathname } = window.location
  closeMask()
  router.replace({
    path: '/login',
    query: {
      redirect: pathname
    }
  })
}
// await new Promise(() => {})

function closeMask () {
  store.commit('setOrderVisible', false)
}
function toDetail (item: any) {
  console.log(item, 'sssss')
  const { orderId: id } = item
  // closeMask()
  store.commit('setRoomId', id)
  router.push({
    path: `/roomDetail/${id}`
  })
}
</script>

<template>
  <Teleport to="#app">
  <div class="mask" @click="closeMask"></div>
  </Teleport>
<ul v-if="orderData.length>0">
    <li v-for="item in orderData" @click="toDetail(item)" :key="item.orderId">
      <img :src="item.pictureUrl" alt="">
      <div class="item">
        <p class="title">{{item.title}}</p>
        <p class="info">{{item.price}} /晚 * {{item.personNumber}}个人</p>
      </div>
    </li>
  </ul>
  <div v-else class="order-loading">
    空空如也
  </div>
</template>

<style scoped lang="scss">
ul {
  position: absolute;
  top: 80px;
  background-color: #fff;
  padding: 5px 16px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .2);
  right: 0px;
  max-height: 160px;
  overflow-y: auto;
  z-index: 15;
  width: 200px;
}
ul {
  @include flex-layout(row, space-between, center);
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  li {
        display: flex;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    padding: 10px;
  }
  &:last-child {
    border-bottom: none;
  }
  img {
    width: 80px;
    height: 55px;
    border-radius: 4px;
    margin-right: 10px;
    object-fit: cover;
  }
  .item {

    max-width: 90px;
    overflow: hidden;

    p {
      line-height: 16px;
      font-weight: normal;
      margin: 10px 0;
      @include line-text-overflow();
    }
    .title {
      line-height: 37px;
    font-size: 16px;
    font-weight: bold;
    color: #000;
      font-weight: 600;
      color: #333;
      font-size: 14px;
      margin: 0;
    }
    .info {
      margin: 0;
      color: #666;
      font-size: 12px;
          line-height: 18px;
    font-size: 12px;
    color: #666;

    }
  }
}

.order-loading{

    position: absolute;
    top: 80px;
    background-color: #fff;
    padding: 5px 16px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .2);
    right: 0px;
    max-height: 160px;
    overflow-y: auto;
    z-index: 10;
    width: 200px;
  text-align: center;
}

</style>
