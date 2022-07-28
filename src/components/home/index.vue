<template>
  <div class="starry-x-index">
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <component :is="Component" :key="route.name"   v-if="route.meta.keepAlive"/>
      </keep-alive>
      <component :is="Component" :key="route.name" v-if="!route.meta.keepAlive"/>
    </router-view>
  </div>
</template>

<script setup>
/**
 * @file index.vue
 */

</script>

<style lang="scss" scoped>
.starry-x-index {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
