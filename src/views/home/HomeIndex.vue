<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import HomeList from './components/homeList.vue'
import HomeTabs from './components/homeTabs.vue'

export default defineComponent({
  asyncData ({ store, route }: any) {
    console.log('asyncData -----', store, route)
    const { pageNo } = store.state
    return store.dispatch('getRoomList', { pageNo })
  },
  setup () {
    const { t } = useI18n()
    return {
      t
    }
  },
  components: { HomeList, HomeTabs }
})
</script>

<template>
<div class="home-page">
  <div class="banner">
  </div>
  <div class="main-wrapper">
    <h2 class="title">{{t('detail.title')}}</h2>
    <p class="subtitle">{{t('detail.subtitle')}}</p>
    <HomeTabs></HomeTabs>
    <!-- 首页列表 -->
    <HomeList></HomeList>
  </div>
</div>
</template>

<style lang="scss">
@import "@/assets/scss/home/index.scss";
</style>
