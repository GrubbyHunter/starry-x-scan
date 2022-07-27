import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import path from "path"
import vue from "@vitejs/plugin-vue"

import { defineConfig, loadEnv } from "vite"

export const aliases = {
	"@": path.resolve(__dirname, "./src")
}

export default ({ mode }) => {
	const envConfig = loadEnv(mode, "./")
	const isDev = envConfig.VITE_APP_PRE_PATH === "dev"
	const config = {
		server: {
			port: 3001,
			open: true,
			https: true,
			proxy: {
				"^/api/v4/": {
					target: "https://www.zhihu.com",
					secure: false,
					changeOrigin: true
				}
			}
		},

		plugins: [vue(),
		//  Import on demand element-ui-plus
			AutoImport({
				resolvers: [ElementPlusResolver()]
			}),
			Components({
				resolvers: [ElementPlusResolver()]
			})
		],
		resolve: {
			alias: aliases
		},
		css: {
			preprocessorOptions: {
				less: {
					// import less global var
					modifyVars: {
						hack: `true; @import (reference) "${path.resolve(__dirname, "./src/assets/styles/common/vars.less")}";`
					},
					javascriptEnabled: true
				}
			}
		}
	}

	return defineConfig(config)
}
