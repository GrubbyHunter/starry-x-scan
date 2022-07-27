import dayjs from "dayjs"
import { ERROR_DATA } from "@/common/error-code"


function serialize(jsonObj) {
	let str = ""
	if (_.isEmpty(jsonObj)) {
		return str
	}

	try {
		str = JSON.stringify(jsonObj)
	} catch (e) {
		// console.error("serialize fail because:", e)
	}
	return str
}


function unSerialize(jsonStr) {
	let jsonObj = {}
	if (_.isEmpty(jsonStr)) {
		return jsonObj
	}

	try {
		jsonObj = JSON.parse(jsonStr)
	} catch (e) {
		// console.error("unSerialize fail because:", e)
	}
	return jsonObj
}

/**
 * @desc 
 *
 * @param {*} key
 * @returns
 */
function getQuery(key) {
	const query = window.location.hash.split("?")

	if (!query || query.length < 2) {
		return ""
	}

	const vars = query[1].split("&")

	for (let i = 0; i < vars.length; i += 1) {
		const pair = vars[i].split("=")

		if (pair[0] === key) {
			return pair[1]
		}
	}

	return ""
}

/**
 * @desc diff time
 *
 * @param {*} newDate  
 * @param {*} oldDate
 * @returns
 */
function getDiffDay(newDate, oldDate) {
	const date1 = dayjs(newDate)
	const date2 = dayjs(oldDate)

	return date1.diff(date2, "day")
}

/**
 * @desc format time
 *
 * @param {*} time newDate
 * @param {*} formatStr "YYYY/MM/DD HH:mm:ss"
 * @returns
 */
function formatTime(time, formatStr) {
	return dayjs(time).format(formatStr)
}

function getInstance(Host) {
	if (Host.instance instanceof Host) {
		return Host.instance
	}

	Host.instance = new Host()
	return Host.instance
}

/**
 * @desc 
 *
 * @param {*} error
 */
function handleError(error, callback) {
	if (error && error.code) {
		if (ERROR_DATA.code.ABORT === error.code) {
			return
		}

		if (_.isEmpty(error.message)) {
			return
		}

		if (!_.isFunction(callback)) {
			return
		}

		callback(error.message)
	}
}

export {
	getProjectInfo, getLoginUser, getDiffDay, getQuery,
	serialize, unSerialize, getInstance, getFullGroupPathById,
	formatTime, handleError, _transformTree, preHandleTreeData
}
