/**
 * @file CookieStorage.js
 * @author John Titor
 */
const doc = document

const cookies = {
	get(cname) {
		const name = `${cname}=`
		const ca = document.cookie.split(";")

		for (let i = 0; i < ca.length; i += 1) {
			let c = ca[i]
			while (c.charAt(0) === " ") {
				c = c.substring(1)
			}
			if (c.indexOf(name) === 0) {
				return c.substring(name.length, c.length)
			}
		}
		return ""
	},

	set(name, value, expiresHours, domain, path) {
		const exp = new Date()
		let _expiresHours = expiresHours
		let _cookies = `${name}=${value}`

		if (!_expiresHours) {
			_expiresHours = 7 * 24// default cookie save time 7 day
		}

		exp.setTime(exp.getTime() + _expiresHours * 60 * 60 * 1000)

		_cookies = `${_cookies};expires=${exp.toGMTString()}`

		if (domain) {
			_cookies = `${_cookies};domain=${domain}`
		}

		if (path) {
			_cookies = `${_cookies};path=${path}`
		}

		doc.cookie = _cookies
	},

	del(name) {
		const exp = new Date()
		exp.setTime(exp.getTime() - 1)
		const val = cookies.get(name)

		// if is expired, here can delete the cookie auto
		if (val != null) {
			doc.cookie = `${name}=${val}expires=${exp.toGMTString()}`
		}
	}
}

export default cookies
