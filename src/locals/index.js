import { createI18n } from "vue-i18n"
import { LANG_TYPE } from "@/common/data"

import zh from "./zh"
import en from "./en"

const messages = {	en,	zh }
const path = window.location.pathname

const lang = path?.indexOf(`/${LANG_TYPE.zh}`) > -1 ? LANG_TYPE.zh : LANG_TYPE.en
const i18n = createI18n({
	locale: lang,
	fallbackLocale: LANG_TYPE.en, // 设置备用语言
	messages
})

export default i18n
