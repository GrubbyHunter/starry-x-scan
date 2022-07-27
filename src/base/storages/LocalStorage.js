/**
 * @file LocalStorage.js
 * @author John Titor
 */

import AbstractStorage from "./Storage"
import { AJAX_CACHE_TYPE } from "@/common/data"

class LocalStorage extends AbstractStorage {
	constructor() {
		super(AJAX_CACHE_TYPE.local)
	}
}

export default LocalStorage
