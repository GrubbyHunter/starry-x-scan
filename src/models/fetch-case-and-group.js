/**
 * @desc 获取
 * @createTime 2021-01-18
 * @author karsashen <karsashen@tencent.com>
 */

import Request from "@/base/Request"

import { CASE_GROUP_TYPE, SUCCESS_CODE } from "@/common/data"

class FetchCaseAndGroupList extends Request {
	constructor() {
		super()

		this.url = "list_basic_subgroup_and_case"
		this.type = "post"

		this.format = (data) => {
			if (data.code !== SUCCESS_CODE) {
				return {
					total: 0,
					list: []
				}
			}

			const list = []
			const { case_details: caseList, group_details: groupList, total } = data

			_.each(caseList, (item) => {
				item.id = item.case_id
				item.name = item.case_name
				item.level = item.case_level
				item.type = CASE_GROUP_TYPE.case.key

				list.push(item)
			})

			_.each(groupList, (item) => {
				list.push({
					id: item.id,
					name: item.name,
					parentId: item.parent_id,
					type: CASE_GROUP_TYPE.group.key
				})
			})

			return { list, total }
		}
	}
}

// 导出一个单例实体
export default FetchCaseAndGroupList.getInstance()
