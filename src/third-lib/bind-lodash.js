/**
 * @file bind-lodash.js
 */
import chain from "lodash-es/chain"
import clone from "lodash-es/clone"
import cloneDeep from "lodash-es/cloneDeep"
import debounce from "lodash-es/debounce"
import each from "lodash-es/each"
import extend from "lodash-es/extend"
import filter from "lodash-es/filter"
import find from "lodash-es/find"
import isArray from "lodash-es/isArray"
import isBoolean from "lodash-es/isBoolean"
import isDate from "lodash-es/isDate"
import isEmpty from "lodash-es/isEmpty"
import isFunction from "lodash-es/isFunction"
import isNaN from "lodash-es/isNaN"
import isNull from "lodash-es/isNull"
import isNumber from "lodash-es/isNumber"
import isObject from "lodash-es/isObject"
import isRegExp from "lodash-es/isRegExp"
import isString from "lodash-es/isString"
import isUndefined from "lodash-es/isUndefined"
import keys from "lodash-es/keys"
import last from "lodash-es/last"
import map from "lodash-es/map"
import reduce from "lodash-es/reduce"
import reverse from "lodash-es/reverse"
import sortBy from "lodash-es/sortBy"
import throttle from "lodash-es/throttle"
import uniq from "lodash-es/uniq"
import uniqBy from "lodash-es/uniqBy"
import uniqueId from "lodash-es/uniqueId"

/**
	* @desc bind in window._
	* @export
	*/
export default function bindLodash() {
	const _ = {
		chain,
		clone,
		cloneDeep,
		each,
		extend,
		filter,
		find,
		isArray,
		isBoolean,
		isDate,
		isEmpty,
		isFunction,
		isNaN,
		isNull,
		isNumber,
		isObject,
		isRegExp,
		isString,
		isUndefined,
		keys,
		last,
		map,
		reduce,
		sortBy,
		uniqueId,
		debounce,
		throttle,
		uniq,
		uniqBy,
		reverse
	}

	window._ = _
}
