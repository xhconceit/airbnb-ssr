<script lang="ts">
import { useStore } from '@/store'
import { defineComponent, watch } from 'vue'
import { useRoute } from 'vue-router'
import RoomDetail from './components/detail.vue'

export default defineComponent({
  asyncData ({ store, route }: any) {
    console.log('async 详情页', store, route)
    const { roomId } = store.state
    const { id } = route.value.params
    return store.dispatch('getRoomDetail', { id: roomId || id })
  },
  setup () {
    const route = useRoute()
    const store = useStore()
    watch(() => route.params, (newval, oldval) => {
      store.dispatch('getRoomDetail', newval)
    })
  },
  components: { RoomDetail }
})
</script>

<template>
  <RoomDetail></RoomDetail>
</template>

<style lang="scss">
@import '@/assets/scss/detail/index.scss';
</style>
