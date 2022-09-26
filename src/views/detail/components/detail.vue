<script setup lang="ts">
import { saveOrderApi } from '@/api/order'
import { saveRecordApi } from '@/api/record'
import { useStore } from '@/store'
import { computed, getCurrentInstance, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const { t } = useI18n()

const ruleForm = ref()
const store = useStore()
const route = useRoute()
const router = useRouter()

const { proxy }:any = getCurrentInstance()

const orderForm = reactive({
  personNumber: 1
})

const roomDetail = computed(() => store.state.roomDetail)

function submitForm () {
  if (store.state.userStatus) {
    saveOrder()
  } else {
    const { pathname } = window.location
    router.replace({
      path: '/login',
      query: {
        redirect: pathname
      }
    })
  }
}
function saveOrder () {
  const { id: orderId } = route.params
  const {
    title,
    price,
    imgs
  } = roomDetail.value
  const { personNumber } = orderForm
  console.log(personNumber)
  const params = {
    orderId,
    title,
    price,
    personNumber,
    pictureUrl: imgs[0]
  }
  saveOrderApi(params).then(res => {
    const { success, message } = res
    if (success) {
      proxy.$message.success('预定成功')
      console.log('ok')
    } else {
      proxy.$message.error(message)
    }
  })
}
saveRecord()
function saveRecord () {
  if (!store.state.userStatus) {
    return
  }
  const { id: recordId } = route.params
  const {
    title,
    price,
    imgs
  } = roomDetail.value
  console.log(roomDetail, '----------')
  const { liveNumber: personNumber } = roomDetail.value.info
  console.log(personNumber)
  const params = {
    recordId,
    title,
    price,
    personNumber,
    pictureUrl: imgs[0]
  }
  saveRecordApi(params).then(res => {
    const { success, message } = res
    if (success) {
      proxy.$message.success('记录成功')
      console.log('ok')
    } else {
      proxy.$message.error(message)
    }
  })
}
</script>

  <!-- roomDetail: {
    room: '间卧室',
    bed: '张床',
    toilet: '个公共卫生间',
    liveNumber: '可住',
    people: '人',
    remarks: '条评论',
    metro: '靠近地铁',
    parking: '免费停车',
    luggage: '可放置行李',
    name: '房东：',
    certify: '已验证身份',
    goodOwner: '超赞房东',
    peopleNumber: '人数',
    night: '晚',
    order: '申请预定'
  } -->

<template>
  <div class="room" v-if="roomDetail && roomDetail.info && roomDetail.owner">
    <!-- 照片墙 -->
    <el-carousel v-if="roomDetail.imgs && roomDetail.imgs.length" trigger="click" height="380px" :interval="3000" indicator-position="none" type="card">
      <el-carousel-item v-for="url in roomDetail.imgs" :key="url">
        <img :src="url" alt="" srcset="">
      </el-carousel-item>
    </el-carousel>
    <!-- 详情 -->
    <div class="room-detail">
      <div class="detail-part">
        <h2 class="title">{{roomDetail.title}}</h2>
        <div class="info">
          <span class="room iconfont icon-loufangfangzi">{{roomDetail.info.room}}{{t('roomDetail.room')}}</span>
          <span class="bed iconfont icon-Bed">{{roomDetail.info.bed}}{{t('roomDetail.bed')}}</span>
          <span class="toilet iconfont icon-duliweishengjian">{{roomDetail.info.toilet}} {{t('roomDetail.toilet')}}
</span>
          <span class="live-number iconfont icon-haoyou">{{t('roomDetail.liveNumber')}}{{roomDetail.info.liveNumber}}{{t('roomDetail.people')}}</span>
        </div>
        <div class="tags">
          <el-tag size="small" >{{roomDetail.info.remarks}} {{t('roomDetail.remarks')}}</el-tag>
          <el-tag size="small" v-if="roomDetail.info.metro">{{t('roomDetail.metro')}}</el-tag>
          <el-tag size="small"  v-if="roomDetail.info.parking">{{t('roomDetail.parking')}}</el-tag>
          <el-tag size="small" v-if="roomDetail.info.luggage">{{t('roomDetail.luggage')}}</el-tag>
        </div>
        <!-- 房东信息 -->
        <div class="owner-detail">
          <img :src="roomDetail.owner.avatar" alt="">
          <div class="info">
            <p class="name">{{t('roomDetail.name')}}{{roomDetail.owner.name}}</p>
            <p>
              <span v-if="roomDetail.owner.certify">{{t('roomDetail.certify')}}</span>
              <span v-if="roomDetail.info.goodOwner"> · {{t('roomDetail.goodOwner')}}</span>
            </p>
          </div>
        </div>
        <!-- 基本介绍 -->
        <div class="introduce">
          {{roomDetail.owner.introduce}}
        </div>
      </div>
      <div class="form-part">
        <div class="price">
          <span>¥{{roomDetail.price}}</span> /{{t('roomDetail.night')}}
        </div>
        <el-form ref="ruleForm" :model="orderForm">
          <el-form-item prop="personNumber" :label="t('roomDetail.peopleNumber')">
            <select name="" id="" v-model="orderForm.personNumber">
              <option v-for="item in 3" :value="item" :key="item">{{item}}{{t('roomDetail.people')}}</option>
            </select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">{{t('roomDetail.order')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/detail/index.scss';
</style>
