/**
 * @file index.js
 * @desc third-lib
 */
import bindLodash from "./bind-lodash"
import bindI18n from "./bind-i18n"
/**
	*
	* @desc
	* @export
	*/
function init(app, router) {
	bindLodash()
	bindI18n(app)
}

export { init }
