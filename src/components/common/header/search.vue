<template>
  <el-input
    v-model="input3"
    size="large"
    placeholder="Please input your contract"
    class="input-filter w-60"
  >
    <template #prepend>
      <el-select class="head-filter" size="large" v-model="select" placeholder="Select">
        <el-option label="Contract" value="1" />
        <el-option label="NFT" value="2" />
      </el-select>
    </template>
    <template #append>
      <el-button size="large" :icon="Search" type="primary" />
    </template>
  </el-input>
</template>

<script setup>
import { ref } from "vue"
import { Search } from "@element-plus/icons-vue"

const input1 = ref("")
const input2 = ref("")
const input3 = ref("")
const select = ref("")
</script>

<style lang="less" scoped>
.input-filter {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;

  .head-filter {
    width: 9rem;
  }

  &.w-60 {
    width: 100%;
  }
}

@media (min-width: 576px) {
  .input-filter {
    margin-left: auto !important;
    margin-bottom: 0 !important;

    .head-filter {
      width: 12rem !important;
    }
  }

  .w-60 {
    width: 60% !important;
  }
}

@media (min-width: 576px) and (max-width: 1200px) {

}

@media (min-width: 1400px) {

}
</style>
