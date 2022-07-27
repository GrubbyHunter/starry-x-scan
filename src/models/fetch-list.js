/**
 * @createTime 2021-01-18
 * @author John Titor
 */

import Request from "@/base/Request"
import { SUCCESS_CODE } from "@/common/data"

class FetchList extends Request {
	constructor() {
		super()

		this.url = "me/switches"
		this.type = "get"
	}
}

export default FetchList.getInstance()
