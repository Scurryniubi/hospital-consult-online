<template>
  <div>
    <van-tabs shrink sticky v-model:active="active">
      <van-tab title="关注" name="like">
        <follow-doctor></follow-doctor>
        <knowledge-list type="like" />
      </van-tab>
      <van-tab title="推荐" name="recommend"><knowledge-list type="recommend" /></van-tab>
      <van-tab title="减脂" name="fatReduction"><knowledge-list type="fatReduction" /></van-tab>
      <van-tab title="饮食" name="food"><knowledge-list type="food" /></van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import FollowDoctor from '@/views/home/components/FollowDoctor.vue'
import KnowledgeList from '@/views/home/components/KnowledgeList.vue'
import { ref } from 'vue'
import type { KnowledgeType } from '@/types/consult'
// 用于控制van-tab切换初始值为'推荐'
const active = ref<KnowledgeType>('recommend')
</script>

<style scoped></style>
