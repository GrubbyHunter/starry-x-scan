<template>
  <el-config-provider :locale="locale" :namespace="NAME_SPACE">
    <div class="page-container">
      <Header></Header>

      <div class="starry-main">
        <router-view></router-view>
      </div>

      <Footer></Footer>
    </div>
  </el-config-provider>
</template>

<script setup>
/**
 * @file index.vue
 * @createTime 2022-07-27
 * @author John Titor
 */
import { onMounted, ref, computed } from "vue"
import { NAME_SPACE } from "@/common/data"

import zhCn from "element-plus/dist/locale/zh-cn.mjs"
import en from "element-plus/dist/locale/en.mjs"

import Header from "@/components/common/header.vue"
import Footer from "@/components/common/footer.vue"

const language = ref("zh-cn")
const locale = computed(() => (language.value === "zh-cn" ? zhCn : en))

const toggle = () => {
	language.value = language.value === "zh-cn" ? "en" : "zh-cn"
}

onMounted(() => {
	// global api
	window.global_api = {
		$message: {},
		$loading: {}
	}
})

</script>

<style lang="less" scoped>
.page-container {
  background: #fff;
  color: #203062;
  height: 100%;
  display: flex;
  flex-direction: column;

  .ui-right-page {
    display: flex;
    flex: 1;
    overflow: auto;
  }
}

</style>
