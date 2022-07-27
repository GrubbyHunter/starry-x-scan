/**
 * @file request.js
 * @author John Titor
 */

import { AJAX_CACHE_TYPE, SUCCESS_CODE } from "@/common/data"
import { APP_ERROR, ERROR_DATA, SUCCESS_DATA } from "@/common/error-code"
import { getProjectInfo, handleError } from "@/common/utils"

import Base from "./Base"
import { CONST_LOADING } from "@/common/text"
import Storage from "@/base/storages/Storage"
import axios from "axios"

const { CancelToken } = axios
const { VITE_APP_PROTOCOL, VITE_APP_HOST, VITE_APP_PRE_PATH } = import.meta.env
const isTest = VITE_APP_PRE_PATH === "test"
const HTTP_CONFIG = {
	protocol: VITE_APP_PROTOCOL,
	host: VITE_APP_HOST
}

if (isTest) {
	if (window.__RUNNING_IN_QIANKUN__) {
		HTTP_CONFIG.protocol = ""
		HTTP_CONFIG.host = VITE_APP_HOST
	} else {
		HTTP_CONFIG.protocol = VITE_APP_PROTOCOL
		HTTP_CONFIG.host = `${VITE_APP_HOST}`
	}
}

const TYPE = {
	get: "get",
	post: "post"
}
const TIME_OUT = 60 * 1000
const DEFAULT_ERROR_CODE = "400"
const TIMEOUT_CODE = "501"
const {
	code: {
		SERVER_ERROR,
		WARNING_TIPS,
		AUTHORITY_DENY,
		QUERY_DATA_NOT_EXIST,
		CONTAINS_DATA_ERROR,
		PARAMS_ERROR,
		EXTRA_API_ERROR,
		STATUS_NOT_ALLOW,
		SEARCH_PARAMS_NULL,
		DATA_NOT_ALLOW_EDIT,
		UPLOAD_FILE_FAIL,
		TASK_EXIST,
		INVALID,
		ABORT,
		EXCEPTION_DB_ERROR,
		EXCEPTION_DB_UPDATE,
		EXCEPTION_DB_DELETE
	},
	message: { DEFAULT, UN_KNOW }
} = ERROR_DATA

const throwErr = (code, errmessage) => {
	let errMessage = errmessage || DEFAULT

	const codeStr = code ? code.toString() : DEFAULT_ERROR_CODE
	let errorLevel = "0"

	// last 6 digits letter
	if (codeStr.length > 6) {
		errorLevel = codeStr.substr(0)
		code = codeStr.substr(-3) // last 3 digits letter

		if (!_.isEmpty(code)) {
			code = parseInt(code, 10)
		}
	}

	switch (code) {
		// Business error reporting，Do not use the front-end error prompt
		case SERVER_ERROR:
			break
		case WARNING_TIPS:
			errMessage = APP_ERROR.WARNING_TIPS
			break
		case AUTHORITY_DENY:
			errMessage = APP_ERROR.AUTHORITY_DENY
			break
		case QUERY_DATA_NOT_EXIST:
			errMessage = APP_ERROR.QUERY_DATA_NOT_EXIST
			break
		case CONTAINS_DATA_ERROR:
			errMessage = APP_ERROR.CONTAINS_DATA_ERROR
			break
		case PARAMS_ERROR:
			errMessage = APP_ERROR.PARAMS_ERROR
			break
		case EXTRA_API_ERROR:
			errMessage = APP_ERROR.EXTRA_API_ERROR
			break
		case STATUS_NOT_ALLOW:
			errMessage = APP_ERROR.STATUS_NOT_ALLOW
			break
		case SEARCH_PARAMS_NULL:
			errMessage = APP_ERROR.SEARCH_PARAMS_NULL
			break
		case DATA_NOT_ALLOW_EDIT:
			errMessage = APP_ERROR.DATA_NOT_ALLOW_EDIT
			break
		case UPLOAD_FILE_FAIL:
			errMessage = APP_ERROR.UPLOAD_FILE_FAIL
			break
		case TASK_EXIST:
			errMessage = APP_ERROR.TASK_EXIST
			break
		case INVALID:
			errMessage = APP_ERROR.INVALID
			break
		case ABORT:
			errMessage = APP_ERROR.ABORT
			break
		case EXCEPTION_DB_ERROR:
			errMessage = APP_ERROR.EXCEPTION_DB_ERROR
			break
		case EXCEPTION_DB_UPDATE:
			errMessage = APP_ERROR.EXCEPTION_DB_UPDATE
			break
		case EXCEPTION_DB_DELETE:
			errMessage = APP_ERROR.EXCEPTION_DB_DELETE
			break
		default:
			break
	}
	return errMessage
}

// report error
const reportError = (response) => {
	const NOT_REPORT_CODE = [SERVER_ERROR]
	const { config, data } = response
	let url = ""
	let code = ""
	let requestParams = ""

	if (config) {
		url = config.url
		code = data.code
		requestParams = config.data
	}

	const error = {
		url,
		code,
		requestParams,
		responseData: data
	}

	if (_.isEmpty(url) && !_.isNumber(code) && _.isEmpty(requestParams)) {
		return
	}


	// without report error code
	if (code) {
		let shortCode = `${code}`.substr(-3) // 取最后三位错误码
		if (!_.isEmpty(shortCode)) {
			shortCode = parseInt(shortCode, 10)
		}

		if (NOT_REPORT_CODE.indexOf(shortCode) > -1) {
			return
		}
	}


	if (window.reportError) {
		// if (url && url.indexOf("trpc") > -1) {
		window.reportError({
			requestUrl: url,
			code,
			msg: `${error.requestParams}|${data.msg}`
		})
		// }
	}
}


const catchError = (error) => {
	if (window.aegis && error) {
		window.aegis.report(error)
	}

	if (window.reportError) {
		const url = error.config ? error.config.url : ""
		let code = ""
		let msg = ""

		if (error.code === "ECONNABORTED") {
			code = TIMEOUT_CODE
			msg = "timeout error"
		} else {
			code = DEFAULT_ERROR_CODE
			msg = error.config?.data
		}

		// if (url && url.indexOf("trpc") > -1) {
		window.reportError({ requestUrl: url, code, msg })
		// }
	}
}
// request before
axios.interceptors.request.use(
	(config) => config,
	(error) => Promise.reject(error)
)

// response before used,we can format data
axios.interceptors.response.use(
	(response) => {
		// not our backend api
		if (response.config && response.config.url) {
			if (response.config.url.indexOf("/api/v4") === -1) {
				return Promise.resolve(response ? response.data : {})
			}
		}

		if (_.isEmpty(response.data) || _.isEmpty(response.data.head)) {
			reportError(response)
			return Promise.reject({
				code: ERROR_DATA.code.INVALID,
				message: ERROR_DATA.ERROR_FORMAT_DATA
			})
		}

		const {
			data,
			head: { errcode, errmessage }
		} = response.data
		const errMessage = throwErr(errcode, errmessage)

		// success code
		if (errcode === SUCCESS_DATA.code) {
			// used promise
			return Promise.resolve(data)
		}

		// error code
		if (_.isEmpty(errMessage)) {
			reportError(response)
			return Promise.reject({
				code: errcode,
				message: UN_KNOW // unknown error
			})
		}

		// report custom error
		reportError(response)
		return Promise.reject({
			code: errcode,
			message: errMessage
		})
	},
	(error) => {
		let defaultMessage = ERROR_DATA.message.DEFAULT

		catchError(error)

		if (error) {
			const code = error.code || error.message.code

			defaultMessage = throwErr(code)

			return Promise.reject({
				code,
				message: defaultMessage
			})
		}

		return Promise.reject({
			code: error.code || "",
			message: defaultMessage
		})
	}
)

/**
 *
 * @desc Request Default
 * @export
 * @class Request
 */
export default class Request extends Base {
	constructor() {
		super()
		this.timeout = TIME_OUT
		this.cacheType = ""
		this.type = TYPE.post
		this.needLoading = false
		this.source = ""
		this.changeParams = false
		this.params = {}
		this.head = {}
		this.format = (data) => data
	}

	/**
	 *
	 *
	 * @param {Object} params Request parameters
	 * @param {boolean} loading Whether to use loading
	 * @param {boolean} useCache 
	 * @returns
	 * @memberof Request
	 */
	exec(params, loading, useCache) {
		const { projectId, appId } = getProjectInfo()
		const { timeout, format } = this

		let url = ""
		let instanceLoading
		let method = ""
		let queryParams = {}

		if (_.isFunction(this.beforeExec)) {
			// If it is an interface of other systems
			// the parameters need to be compatible, and the response parameter needs to be compatible in the format
			this.beforeExec()
		}

		// URLs starting with HTTP or HTTPS do not assemble protocols and domain names
		if (this.url.indexOf("http") === 0 || this.url.indexOf("//") === 0) {
			url = this.url
		} else {
			url = (HTTP_CONFIG.protocol || window.location.origin)
				+ HTTP_CONFIG.host
				+ this.url
		}

		this.xZhiYanProjectId = projectId || ""
		this.params = params || {}

		// cache key，url + proj_id + uniqId
		const key = this.url
		if (useCache && AJAX_CACHE_TYPE[this.cacheType]) {
			const cacheStorage = new Storage(this.cacheType, this.saveTime)

			const result = cacheStorage.get(key)
			if (!_.isEmpty(result) && result.code === SUCCESS_CODE) {
				return Promise.resolve(this.format(result))
			}
		}

		this.source = CancelToken.source() // cancel request

		if (loading) {
			instanceLoading = window.global_api.$loading({
				fullscreen: true,
				text: "loading..."
			})
		}

		if (this.changeParams) {
			// 如果是其他系统的接口，参数需要做兼容处理，response参数在format中做兼容处理
			queryParams = params
		} else {
			queryParams = { head: this.head, ...params }
		}

		if (this.type !== TYPE.get) {
			method = axios[this.type]

			return method(url, queryParams, {
				timeout,
				cancelToken: this.source.token
			})
				.then((data) => {
					// need cache
					if (useCache && AJAX_CACHE_TYPE[this.cacheType]) {
						const cacheStorage = new Storage(this.cacheType, this.saveTime)

						cacheStorage.set(key, data)
					}

					// format response
					return format(data)
				}).catch((error) => {
					handleError(error, (message) => {
						window.global_api.$message.error({
							content: message
						})
					})
				}).finally(() => {
					if (loading) {
						instanceLoading.hide()
					}
				})
		}

		return axios
			.get(url, params, {
				timeout,
				cancelToken: this.source.token
			})
			.then((data) => {
				if (useCache && AJAX_CACHE_TYPE[this.cacheType]) {
					const cacheStorage = new Storage(this.cacheType, this.saveTime)
					cacheStorage.set(key, data)
				}

				return format(data)
			}).catch((error) => {
				handleError(error, (message) => {
					window.global_api.$message.error({
						content: message
					})
				})
			}).finally(() => {
				if (loading) {
					instanceLoading.hide()
				}
			})
	}

	abort(message) {
		const { source } = this

		if (_.isEmpty(source)) {
			return
		}

		source.cancel({
			code: ERROR_DATA.code.ABORT, // abort
			message
		})
	}
}
