import {
	AJAX_CACHE_TYPE,
	CONST_KEY,
	CONST_TIME,
	LASTING_CACHE_KEY
} from "@/common/data"
import { serialize, unSerialize } from "@/common/utils"

import Base from "../Base"
import dayjs from "dayjs"

/**
 * @file Storage.js
 * @author John Titor
 */

const { defaultCacheTime, timeUnit, dateFormat } = CONST_TIME
const PRE_KEY = CONST_KEY.pre_storage_key

const MemoryData = {
	getItem(key) {
		if (_.isEmpty(this[key])) {
			this.removeItem(key)
			return null
		}

		return this[key]
	},

	setItem(key, value) {
		this[key] = value
	},

	removeItem(key) {
		delete this[key]
	}
}

function isValidExpires(expiresTime) {
	if (_.isEmpty(expiresTime)) {
		return false
	}
	const nowMilliseconds = new Date().getTime()
	//  fixed safari time
	const formatExpiresTime = expiresTime.replace(/-/g, "/")
	const expiresMilliseconds = new Date(formatExpiresTime).getTime()

	if (expiresMilliseconds > nowMilliseconds) {
		return true
	}

	return false
}

// str format date-time
function conversionTime(saveTime) {
	const defaultTime = saveTime || defaultCacheTime

	const unit = _.last(defaultTime)
	let milliseconds
	let num

	switch (unit.toUpperCase()) {
		case timeUnit.D:
			milliseconds = 24 * 60 * 60 * 1000
			break
		case timeUnit.H:
			milliseconds = 60 * 60 * 1000
			break
		case timeUnit.M:
			milliseconds = 60 * 1000
			break
		case timeUnit.S:
			milliseconds = 1000
			break
		default:
			milliseconds = 1000
			break
	}

	try {
		num = parseInt(defaultTime.substring(0, defaultTime.length - 1), 10)
	} catch (e) {
		// console.error("invalid saveTime", e)
		num = 1
	}

	milliseconds *= num
	const nowMilliseconds = new Date().getTime()
	const saveDate = dayjs(nowMilliseconds + milliseconds).format(dateFormat.fullTime)

	return saveDate
}

/**
 *
 * @class AbstractStorage
 * @extends {Base}
 */
class AbstractStorage extends Base {
	constructor(proxyType, saveTime) {
		super()

		let proxy = null

		switch (proxyType) {
			case AJAX_CACHE_TYPE.local:
				proxy = window.localStorage
				break
			case AJAX_CACHE_TYPE.session:
				proxy = window.sessionStorage
				break
			default:
				proxy = MemoryData
				break
		}
		this.proxyType = proxyType
		this.proxy = proxy
		this.saveTime = saveTime || "15M"
	}

	get(key) {
		const tag = window.branchHash || "1.0"
		let result = null
		key = key.toUpperCase()

		// set session or local level cache，get cache from memory first
		if (this.proxyType !== AJAX_CACHE_TYPE.memory) {
			result = unSerialize(MemoryData.getItem(`${PRE_KEY}${key}`))

			// can't get cache from memory, get from storage 
			if (_.isEmpty(result)) {
				result = unSerialize(this.proxy.getItem(`${PRE_KEY}${key}`))

				// if data not in memory cache , we can save one
				if (!_.isEmpty(result)) {
					MemoryData.setItem(`${PRE_KEY}${key}`, serialize(result))
				}
			}
		} else {
			result = unSerialize(this.proxy.getItem(`${PRE_KEY}${key}`))
		}

		if (_.isEmpty(result)) {
			return null
		}

		// when the tag update, the tag is diff from local tag, we need delete the cache
		if (!LASTING_CACHE_KEY[key] && result.tag !== tag) {
			this.remove(key)
			MemoryData.removeItem(key)
			return null
		}
		// time expired, , we need delete the cache
		if (!isValidExpires(result.expires)) {
			this.remove(key)
			MemoryData.removeItem(key)
			return null
		}

		return result.value
	}

	set(key, value) {
		// tag version
		const tag = window.branchHash || "1.0"
		const saveTimeStr = conversionTime(this.saveTime)

		key = key.toUpperCase()

		// if data not in memory cache , we need save one
		if (this.proxyType !== AJAX_CACHE_TYPE.memory) {
			MemoryData.setItem(`${PRE_KEY}${key}`, serialize({
				expires: saveTimeStr,
				value,
				tag
			}))
		}

		this.proxy.setItem(`${PRE_KEY}${key}`, serialize({
			expires: saveTimeStr,
			value,
			tag
		}))
	}

	remove(key) {
		key = key.toUpperCase()

		this.proxy.removeItem(`${PRE_KEY}${key}`)
	}
}

export default AbstractStorage
