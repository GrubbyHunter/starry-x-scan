<template>
  <el-input
    v-model="input3"
    size="large"
    placeholder="Please input"
    class="input-filter w-60"
  >
    <template #prepend>
      <el-select size="large" v-model="select" placeholder="Select" style="width: 115px">
        <el-option label="Restaurant" value="1" />
        <el-option label="Order No." value="2" />
        <el-option label="Tel" value="3" />
      </el-select>
    </template>
    <template #append>
      <el-button size="large" :icon="Search" />
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
  &.w-60 {
    width: 100%;
  }
}

@media (min-width: 576px) {
  .input-filter {
    margin-left: auto !important;
  }

  .w-60 {
    width: 60% !important;
  }
}

@media (min-width: 576px) and (max-width: 1200px) {
  .input-filter {
    margin-left: auto !important;
  }

  .w-60 {
    width: 60% !important;
  }
}

@media (min-width: 1400px) {
  .input-filter {
    margin-left: auto !important;
  }

  .w-60 {
    width: 60% !important;
  }
}
</style>
