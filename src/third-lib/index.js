/**
 * @file index.js
 * @desc third-lib
 */
import bindLodash from "./bind-lodash"

/**
	*
	* @desc
	* @export
	*/
function init(app, router) {
	bindLodash()
}

export { init }
