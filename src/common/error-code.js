/**
 * @file error-code.js
 * @author John Titor
 */
const SUCCESS_DATA = {
	code: 0
}
const ERROR_DATA = {
	code: {
		SERVER_ERROR: 201,

		WARNING_TIPS: 301,
		AUTHORITY_DENY: 403,
		QUERY_DATA_NOT_EXIST: 404,
		CONTAINS_DATA_ERROR: 405,
		PARAMS_ERROR: 406,
		EXTRA_API_ERROR: 407, // 5000407  
		STATUS_NOT_ALLOW: 408, // 5000408 
		SEARCH_PARAMS_NULL: 409, // 5000409 
		DATA_NOT_ALLOW_EDIT: 410, // 500410 
		UPLOAD_FILE_FAIL: 411, // 500411  
		TASK_EXIST: 412, // #
		INVALID: 417, // 
		ABORT: 444,

		EXCEPTION_DB_ERROR: 500, // 6000500 
		EXCEPTION_DB_UPDATE: 501, // 6000501  
		EXCEPTION_DB_DELETE: 502 // 6000502
	},

	message: {
		ERROR_FORMAT_DATA: "无效的数据，请重新操作",
		DEFAULT: "服务端请求异常，请重新操作",
		ABORT: "终止请求",
		UN_KNOW: "未知异常"
	},
	level: {
		ERROR: ["5", "6"]
	}
}
const ERR_CODE = 500
const APP_ERROR = {
	WARNING_TIPS: "告警提示",
	AUTHORITY_DENY: "权限拒绝",
	QUERY_DATA_NOT_EXIST: "查询数据不存在",
	CONTAINS_DATA_ERROR: "包含数据错误",
	PARAMS_ERROR: "参数错误",
	EXTRA_API_ERROR: "调用外部API错误",
	STATUS_NOT_ALLOW: "状态不允许操作",
	SEARCH_PARAMS_NULL: "搜索参数为空",
	DATA_NOT_ALLOW_EDIT: "数据不允许编辑",
	UPLOAD_FILE_FAIL: "上传文件失败",
	TASK_EXIST: "任务已经存在",
	INVALID: "无效的数据",
	ABORT: "请求终止",

	EXCEPTION_DB_ERROR: "数据库操作出现异常",
	EXCEPTION_DB_UPDATE: "数据库更新出现异常",
	EXCEPTION_DB_DELETE: "数据删除出现异常"
}

export {
	SUCCESS_DATA, ERR_CODE, ERROR_DATA, APP_ERROR, QTA
}
