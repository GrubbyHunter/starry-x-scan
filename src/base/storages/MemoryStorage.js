/**
 * @file MemoryStorage.js
 * @author John Titor
 */

import AbstractStorage from "./Storage"
import { AJAX_CACHE_TYPE } from "@/common/data"

class MemoryStorage extends AbstractStorage {
	constructor() {
		super(AJAX_CACHE_TYPE.memory)
	}
}

export default MemoryStorage
