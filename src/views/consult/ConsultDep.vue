<script setup lang="ts">
import { ref } from 'vue'
import { useConsultStore } from '@/stores'
import { getAllDep } from '@/api/consult'
import { onMounted } from 'vue'
import type { TopDep } from '@/types/consult'

const store = useConsultStore()
const active = ref(0)
const allDep = ref([] as TopDep[])

const getAllDepApi = async () => {
  const res = await getAllDep()
  allDep.value = res.data
}

onMounted(() => {
  getAllDepApi()
})
</script>

<template>
  <!-- 2. 极速问诊-选择科室 -->
  <div class="consult-dep-page">
    <cp-nav-bar title="选择科室" />
    <div class="wrapper">
      <!-- 一级科室 -->
      <van-sidebar v-model="active">
        <van-sidebar-item v-for="item in allDep" :key="item.id" :title="item.name" />
      </van-sidebar>
      <!-- 二级科室 -->
      <div class="sub-dep">
        <router-link
          @click="store.setDepId(item.id)"
          v-for="item in allDep[active]?.child"
          :key="item.id"
          to="/consult/illness"
          >{{ item.name }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.van-sidebar {
  width: 114px;
  &-item {
    padding: 14px;
    color: var(--cp-tag);
    &--select {
      color: var(--cp-main);
      font-weight: normal;
      &::before {
        display: none;
      }
    }
  }
}
.consult-dep-page {
  padding-top: 46px;
}

.wrapper {
  height: calc(100vh - 46px);
  overflow: hidden;
  display: flex;
  .sub-dep {
    flex: 1;
    height: 100%;
    overflow-y: auto;
    > a {
      display: block;
      padding: 14px 30px;
      color: var(--cp-dark);
    }
  }
}
</style>
