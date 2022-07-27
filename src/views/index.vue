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
// eslint-disable-next-line import/extensions
import "element-plus/es/components/loading/style/css"
// eslint-disable-next-line import/extensions
import "element-plus/es/components/message/style/css"
import fetchList from "@/models/fetch-list"
import { ElLoading, ElMessage } from "element-plus"

import zhCn from "element-plus/dist/locale/zh-cn.mjs"
import en from "element-plus/dist/locale/en.mjs"

import Header from "@/components/common/header.vue"
import Footer from "@/components/common/footer.vue"

const language = ref("zh-cn")
const locale = computed(() => (language.value === "zh-cn" ? zhCn : en))

const toggle = () => {
	language.value = language.value === "zh-cn" ? "en" : "zh-cn"
}

onMounted(async () => {
	// global api
	window.global_api = {
		$message: ElMessage,
		$loading: ElLoading.service
	}

	// window.global_api.$loading({
	// 	fullscreen: true,
	// 	text: "loading..."
	// })
	// window.global_api.$message.success("success")

	const result = await fetchList.exec({ include: "is_creator" }, true)

	if (result) {
		console.log(result)
	}
})

</script>

<style lang="less" scoped>
.page-container {
  height: 100%;
  margin: 0;
  min-height: 100%;
  background-color: #f8f9fa;
}
</style>
