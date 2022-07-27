import "@/assets/styles/main.less"

import Index from "./views/index.vue"
import { createApp } from "vue"
import { init } from "./third-lib"
import router from "./router"

const app = createApp(Index)

init(app, router)

app.use(router)
app.mount("#starry-x-scan")
