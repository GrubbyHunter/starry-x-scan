const STARRY_X_SCAN = "starry-x-scan"
const CONST_KEY = {
	pre_storage_key: "STARRY_X_SCAN" // PRE KEY
}

const AJAX_CACHE_TYPE = {
	session: "session", // window.sessionStorage
	local: "local", // window.localStorage
	memory: "memory"
}

const LASTING_CACHE_KEY = {
	DEFAULT_KEY: true // if you want used cache, need add a key here
}

const CONST_TIME = {
	defaultCacheTime: "15M",
	dateFormat: {
		day: "YYYY-MM-DD",
		onlyDay: "MM-DD",
		fullTime: "YYYY-MM-DD HH:mm:ss", // fixed safari
		fullTimeString: "YYYY-MM-DD-HHmmss", // fixed safari
		HHmmss: "HH:mm:ss"
	},
	timeUnit: {
		D: "D",
		H: "H",
		M: "M",
		S: "S"
	},
	unit: {
		hours: { key: "h", value: "hour" },
		minutes: { key: "m", value: "minute" },
		seconds: { key: "s", value: "second" }
	}
}

const SUCCESS_CODE = 0
const TASK_FETCH_PRE_PATH = "/api/v4"
const NAME_SPACE = "stx"
export {
	AJAX_CACHE_TYPE,
	CONST_KEY,
	LASTING_CACHE_KEY,
	CONST_TIME,
	SUCCESS_CODE,
	TASK_FETCH_PRE_PATH,
	NAME_SPACE
}
