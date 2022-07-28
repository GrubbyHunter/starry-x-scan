import { CONST_ROUTES } from "@/common/routes"
import HomeComponent from "@/components/home/index.vue"

import { createRouter, createWebHistory } from "vue-router"

const { home } = CONST_ROUTES
const getPrePath = (str) => `/:lang?${str || ""}`
// 开启历史模式
const router = createRouter({
	history: createWebHistory(),
	routes: [

		{
			path: getPrePath(),
			redirect: { name: home.key }
		},

		// 用例管理
		{
			path: getPrePath(),
			component: () => import("../views/home.vue"),
			children: [
				{
					path: "",
					component: HomeComponent,
					name: home.key,
					meta: {
						keepAlive: true
					},
					children: [
					]
				}
			]
		}
	]
})

export default router
