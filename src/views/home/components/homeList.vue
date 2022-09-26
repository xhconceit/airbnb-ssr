<script setup lang="ts">
import { useStore } from '@/store/index'
import Pagination from '@/components/common/pagination.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()
function changePage (pageNo:number) {
  store.dispatch('getRoomList', { pageNo })
  console.log(pageNo)
}
function toDetail (item: any) {
  console.log(item)
  const { id } = item
  store.commit('setRoomId', id)
  router.push({
    path: `/roomDetail/${id}`
  })
}
</script>

<template>
    <!-- 城市筛选 -->
    <div class="home-list">
      <div class="item" @click="toDetail(item)" v-for="item in store.state.roomList" :key="item.id">
        <img :src="item.pictureUrl" alt="">
        <p class="title">{{item.title}}</p>
        <p class="price">¥ {{item.price}}</p>
      </div>
    </div>
    <!-- 分页 -->
    <Pagination @changePage="changePage"></Pagination>
</template>

<style lang="scss">
</style>
