<script lang="ts" setup>
import { zhCn, en } from 'element-plus/es/locale/index'
import { ref, getCurrentInstance, computed, defineAsyncComponent, onMounted } from 'vue'
import { fetchLanguageApi } from '@/api/layout/index'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { userLogoutApi } from '@/api/login'
import { IResultOr } from '@/api/interface'
import { useStore } from '@/store'

const store = useStore()
const router = useRouter()

const OrderPopover = defineAsyncComponent(() => import('@/views/order/components/OrderPopover.vue'))

// const emits = defineEmits<{(e:'changeLang', langeage:any): void}>()

const { t, locale: localeLanguage } = useI18n()
const { proxy }:any = getCurrentInstance()

function handleSelect (e:any) {
  console.log(e)
  if (e === 'zh') {
    store.dispatch('saveLanguage', zhCn)
    localeLanguage.value = e
  } else if (e === 'en') {
    store.dispatch('saveLanguage', en)
    localeLanguage.value = e
  } else if (e === 'login') {
    router.push({ name: 'login' })
  } else if (e === 'logout') {
    userLogout()
  } else if (e === 'orders') {
    store.commit('setOrderVisible', true)
  } else if (e === 'records') {
    router.push({ name: 'record' })
  }
}

const orderVisible = computed(() => store.state.ordervisible)

// mock 保存当前语言包

// eslint-disable-next-line no-unused-vars
function getLanguage () {
  fetchLanguageApi().then(res => {
    const { success, result } = res
    if (success) {
      console.log(result, 'asfds')
      let name = 'zh'
      if (result) {
        name = result.name.name
      }
      console.log(name)
      if (name === 'zh' || name === 'zh-cn') {
        // emits('changeLang', zhCn)
        store.dispatch('saveLanguage', zhCn)
        localeLanguage.value = name
      } else if (name === 'en') {
        // emits('changeLang', en)
        store.dispatch('saveLanguage', en)
        localeLanguage.value = name
      }
      // if (name === 'zh') {
      //   // emits('changeLang', zhCn)
      //   saveLanguage('zh')
      // } else if (name === 'en') {
      //   // emits('changeLang', en)
      //   saveLanguage('en')
      // }
    }
  })
}
onMounted(() => {
  getLanguage()
})

const activeIndex = ref('orders')

const userStatus = computed(() => store.state.userStatus)

function userLogout () {
  userLogoutApi().then((res: IResultOr) => {
    const { success, message } = res
    if (success) {
      store.commit('setUserStatus', 0)
      router.push({
        name: 'login'
      })
      localStorage.setItem('userId', '')
      proxy.$message.success(message)
    } else {
      proxy.$message.error(message)
    }
  })
}

function goHome () {
  router.push({
    name: 'home'
  })
}
</script>

<template>
<div class="header-common">
  <img class="logo" @click="goHome" src="@/assets/images/logo-text.png" alt="">
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    :ellipsis="false"
  >
    <el-menu-item index="orders">{{t('header.orders')}}
          <template v-if="orderVisible">
        <Suspense>
        <template #default>
          <OrderPopover></OrderPopover>
        </template>
        <template #fallback>
          <div class="order-loading">
            loading ...
          </div>
        </template>
      </Suspense>
      </template>
    </el-menu-item>
    <el-menu-item index="records">{{t('header.records')}}</el-menu-item>
    <el-sub-menu index="language">
      <template #title>{{t('header.language')}}</template>
      <el-menu-item index="zh">中文</el-menu-item>
      <el-menu-item index="en">English</el-menu-item>
    </el-sub-menu>
    <el-sub-menu v-if="userStatus === 1" index="avatar">
      <template #title>
        <img class="avater" src="@/assets/images/avatar.jpeg" alt="">
      </template>
      <el-menu-item index="logout">{{t('login.logout')}}</el-menu-item>
    </el-sub-menu>
    <el-menu-item v-else index="login">
      {{t('login.loginTab')}}/{{t('login.signTab')}}
    </el-menu-item>
  </el-menu>
</div>

</template>

<style lang="scss" scoped>

@import "@/assets/scss/layout/commonHeader.scss";
</style>
