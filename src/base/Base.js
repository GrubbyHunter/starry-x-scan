/**
 * @file Base.js
 * @author John Titor
 */

import { getInstance as getIns } from "@/common/utils"

export default class Base {
	// singleton method
	static getInstance() {
		return getIns(this)
	}
}
