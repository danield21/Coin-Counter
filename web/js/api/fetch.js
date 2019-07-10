/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import {NotLoadedError} from './errors'

const cache = new Map()

export function fetch(url) {
	if(cache.has(url)) {
		return cache.get(url)
	}
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest()
		request.open("GET", `/json${url}.json`)
		request.addEventListener('load', function () {
			try {
				const json = JSON.parse(this.responseText)
				cache.set(url, json)
				resolve(json)
			} catch(e) {
				reject(new NotLoadedError('Could not load JSON'))
			}
		})
		request.addEventListener("error", function () {
			reject(new NotLoadedError("Could not load JSON"))
		})
		request.send()
	})
}