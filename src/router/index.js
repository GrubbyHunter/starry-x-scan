import { CONST_ROUTES } from "@/common/routes"
import HomeComponent from "@/components/home/index.vue"

import { createRouter, createWebHistory } from "vue-router"

const { home } = CONST_ROUTES

// 开启历史模式
const router = createRouter({
	history: createWebHistory(),
	routes: [

		{
			path: "",
			redirect: { name: home.key }
		},

		// 用例管理
		{
			path: "",
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
