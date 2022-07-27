/**
 * @file SessionStorage.js
 * @author John Titor
 */

import AbstractStorage from "./Storage"
import { AJAX_CACHE_TYPE } from "@/common/data"

class SessionStorage extends AbstractStorage {
	constructor() {
		super(AJAX_CACHE_TYPE.session)
	}
}

export default SessionStorage
