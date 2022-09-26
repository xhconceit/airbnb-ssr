<script setup lang="ts">
import { getRecordApi } from '@/api/record/index'
import { useStore } from '@/store'
import { getCurrentInstance, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
const store = useStore()
const { proxy } :any = getCurrentInstance()
const recordData = ref<any>([])
const loading = ref(true)
function fetchRecord () {
  getRecordApi().then((res: any) => {
    const { success, message, result } = res
    loading.value = false
    if (success) {
      recordData.value = result
      console.log(result)
    } else {
      proxy.$message.error(message)
    }
  })
}
onMounted(() => {
  if (store.state.userStatus) {
    fetchRecord()
  } else {
    const { fullPath } = route
    router.replace({
      path: '/login',
      query: {
        redirect: fullPath
      }
    })
  }
})
function toDetail (item: any) {
  console.log(item)
  const { recordId: id } = item
  store.commit('setRoomId', id)
  router.push({
    path: `/roomDetail/${id}`
  })
}
</script>

<template>
  <div class="record-page">
    <div class="main-wrapper">
      <el-skeleton :loading="loading" animated>
        <template #template>
          <div class="column-style">
            <div class="item" v-for="i in 9" :key="i">
              <el-skeleton-item variant="image" style="width:315px;height:240px;border-radius:4px;"></el-skeleton-item>
              <el-skeleton-item variant="p" style="width:100%;margin-top: 20px;"></el-skeleton-item>
              <el-skeleton-item variant="p" style="width:30%;"></el-skeleton-item>
            </div>
          </div>
        </template>
        <template #default>
          <div class="column-style" v-if="recordData.length > 0">
            <div class="item" @click="toDetail(item)" v-for="item in recordData" :key="item.recordId">
              <el-image :src="item.pictureUrl" :alt="item.title"></el-image>
              <p class="title">{{item.title}}</p>
              <p class="price">¥ {{item.price}}</p>
            </div>
          </div>
          <el-empty desciption="无浏览记录"></el-empty>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<style lang="scss">
.record-page {
  .main-wrapper {
    @include main-wrapper(30px);
    .column-style {
      column-count: 3;
      .item {
        width: 315px;
        overflow: hidden;
        margin-bottom: 25px;
        cursor: pointer;
        text-align: left;
        display: inline-block;
        img {
          width: 315px;
          height: auto;
          border-radius: 4px;

        }
        .title {
          width: 315px;
          font-size: 18px;
          margin: 15px 0;
          font-weight: bold;

        }
        .price {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
