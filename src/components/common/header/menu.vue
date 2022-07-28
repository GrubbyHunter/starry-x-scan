<template>
  <el-menu
    :default-active="activeIndex"
    :class="className"
    :mode="menuType"
    size="medium"
    @select="handleSelect"
  >
    <el-menu-item index="1">Search</el-menu-item>
    <el-sub-menu index="2">
      <template #title>BlockChain</template>
      <el-menu-item index="2-1">BlockChain one</el-menu-item>
      <el-menu-item index="2-2">BlockChain two</el-menu-item>
      <el-menu-item index="2-3">BlockChain three</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="3" disabled>NFT</el-menu-item>
  </el-menu>
</template>

<script setup>
import { ref } from "vue"
import { useMenuState } from "./state/menu"

const { menuType, isExpand, className } = useMenuState()
const activeIndex = ref("1")
const activeIndex2 = ref("1")

const handleSelect = (key, keyPath) => {
	console.log(key, keyPath)
}
</script>
<style lang="scss" scoped>
.menu-select-list {
  margin: 0;
  display: none;

  &.show {
    display: block;
  }
}

@media (min-width: 576px) {
  .menu-select-list {
    margin-left: auto !important;
    display: flex !important;
    height: 4rem !important;
    margin-top: 0.5rem !important;
    justify-content: flex-end;
  }
}

@media (min-width: 576px) and (max-width: 1200px) {

}

@media (min-width: 1400px) {

}
</style>
