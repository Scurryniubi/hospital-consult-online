<template>
  <div>wotacall110!</div>
  <hr />
  <p>{{ modelValue }}</p>
  <hr />
  <p>{{ games }}</p>
  <hr />
  <button @click="changeSports">修改sports</button>
  <button @click="changeGames">修改games</button>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  games: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', data: string): void
  (e: 'update:games', data: string): void
}>()
const changeSports = () => {
  emit('update:modelValue', '橄榄球')
}
const changeGames = () => {
  emit('update:games', '射击游戏')
}
</script>

<style scoped></style>
