<template>
  <el-menu
    :default-active="activeIndex"
    class="menu-select-list"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1">Processing Center</el-menu-item>
    <el-sub-menu index="2">
      <template #title>Workspace</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="3" disabled>Info</el-menu-item>
    <el-menu-item index="4">Orders</el-menu-item>
  </el-menu>
</template>

<script setup>
import { ref } from "vue"

const activeIndex = ref("1")
const activeIndex2 = ref("1")
const handleSelect = (key, keyPath) => {
	console.log(key, keyPath)
}
</script>
<style lang="less" scoped>
.menu-select-list {
  margin:0;
}

@media (min-width: 576px) {
  .menu-select-list {
    margin-left: auto !important;
  }
}

@media (min-width: 576px) and (max-width: 1200px) {
  .menu-select-list {
    margin-left: auto !important;
  }
}

@media (min-width: 1400px) {
  .menu-select-list {
    margin-left: auto !important;
  }
}
</style>
