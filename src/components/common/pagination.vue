<script setup lang="ts">
import { useStore } from '@/store/index'
import { computed } from 'vue'

const emit = defineEmits<{(e: 'changePage', pageNo: number):void}>()
const store = useStore()
const pageNo = computed(() => store.state.pageNo)
const pageSize = computed(() => store.state.pageSize)
const total = computed(() => store.state.total)
function changePage (pageNo:number, pageSize: number) {
  emit('changePage', pageNo)
}
</script>

<template>
  <el-pagination v-model:currentPage="pageNo" :page-size="pageSize" :total="total" background layout="prev,pager,next" @current-change="changePage"></el-pagination>
</template>

<style lang="scss">
.el-tabs {
    --el-tabs-header-height: 48px;
    text-align: center;
    line-height: 48px;
}
.el-tabs--card>.el-tabs__header .el-tabs__item.is-active{

    background: #00848A;
}
.el-tabs__item {
    min-width: 120px ;
    height: 48px;
    border: solid 0.5px #D8D8D8;
    border-radius: 3px;
    background: #ffffff;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    box-shadow: 0px 1px 2px rgb(0 0 0 / 15%);
    font-size: 17px;
    color: #484848;
    text-align: center;
    font-weight: bold;
    outline: none;
    -webkit-transition: box-shadow 0.5s;
    -moz-transition: box-shadow 0.5s;
    transition: box-shadow 0.5s;
    margin: 0 5px;
}
.el-tabs__nav-prev,.el-tabs__nav-next {
     border-radius: 50%;
    text-align: center;
    line-height: 41px;
    font-size: 20px;
    width: 34px;
    height: 34px;
    top: 24px;
    color: #484848;
    border:1px solid #ccc;
    transform: translate(0px, -50%);
}
.el-tabs__item {
  width: 200px;
}
.el-tabs__nav-wrap.is-scrollable {
  padding: 0 40px;
}

.el-tabs--card>.el-tabs__header .el-tabs__item,.el-tabs--card>.el-tabs__header .el-tabs__nav,.el-tabs--card>.el-tabs__header{
  border: none;
}
</style>
