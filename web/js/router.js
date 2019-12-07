/**
 * 
 */
export class Router {
	/** @typedef {function(...string)} handler */
	/**
	 * 
	 * @param {Map<RegExp|string, handler>} routes 
	 * @param {handler} notFound
	 */
	constructor(routes, notFound) {
		this.navigate = function (href) {
			if(href == null) {
				href = document.location.pathname
			}

			let found = false
			routes.forEach(function (handler, matcher) {
				if(found) {
					return
				}

				if(typeof matcher == 'string' && matcher == href) {
					handler(href, [], {})
					found = true
				} else if(matcher instanceof RegExp) {
					let matches = matcher.exec(href)
					if(matches) {
						handler(href, matches.slice(1), {})
						found = true
					}
				}
			})

			if(!found) {
				console.warn('Could not find', href)
				notFound(href)
			}
		}
	}
}