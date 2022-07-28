<template>
  <el-config-provider :locale="locale" :namespace="NAME_SPACE">
    <div class="page-container">
      <Header></Header>

      <div class="starry-main">
        <router-view></router-view>
      </div>
    </div>
		<Footer></Footer>
  </el-config-provider>
</template>

<script setup>
/**
 * @file index.vue
 * @createTime 2022-07-27
 * @author John Titor
 */
import { onMounted, ref, computed } from "vue"
import { useRoute } from "vue-router"
import { NAME_SPACE, LANG_TYPE } from "@/common/data"
import fetchList from "@/models/fetch-list"
import { ElLoading, ElMessage } from "element-plus"

import zhCn from "element-plus/dist/locale/zh-cn.mjs"
import en from "element-plus/dist/locale/en.mjs"

import Header from "@/components/common/header/index.vue"
import Footer from "@/components/common/footer.vue"

const route = useRoute()

const locale = computed(() => (route.params?.lang === LANG_TYPE.zh ? zhCn : en))

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

	// const result = await fetchList.exec({ include: "is_creator" }, true)

	// if (result) {
	// 	console.log(result)
	// }
})

</script>

<style lang="scss" scoped>
.page-container {
  height: calc(100vh - 5rem);
  margin: 0;
  min-height: calc(100vh - 5rem);
  background-color: #f8f9fa;
}
</style>
