<script setup lang="ts">
import CommonHeader from '@/components/layout/commonHeader.vue'
import CommonFooter from '@/components/layout/commonFooter.vue'
// import { en } from 'element-plus/es/locale/index'
// import { ref } from 'vue'
// import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useStore } from '@/store/index'
// const locale = ref(en)

const store = useStore()
const route = useRoute()

// const { locale: localeLanguage } = useI18n()

// function changeLang (language:any) {
//   locale.value = language
//   localeLanguage.value = language.name
// }
</script>

<template>
  <el-config-provider :locale="store.state.locale">
    <CommonHeader v-show="!route.fullPath.includes('login')" ></CommonHeader>
    <div class="container">
      <router-view></router-view>
    </div>
    <CommonFooter v-show="!route.fullPath.includes('login')"></CommonFooter>
  </el-config-provider>
</template>

<style scoped>

</style>
