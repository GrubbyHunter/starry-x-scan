<template>
  <div class="starry-home">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"  />
      </keep-alive>

    </router-view>
  </div>
</template>

<script setup>

</script>
<style lang="scss" scoped>
.starry-home {
  flex: 1;
  width: 100%;
  overflow: hidden;
}
</style>
