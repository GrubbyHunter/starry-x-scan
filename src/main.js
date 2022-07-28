import "@/assets/styles/main.scss"

import Index from "./views/index.vue"
import { createApp } from "vue"
import { init } from "./third-lib"
import router from "./router"

const app = createApp(Index)
app.use(router)

init(app, router)
app.mount("#starry-x-scan")
