/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import {NotFoundError} from './api/errors'
import chooseLocale from './page/chooseLocale'
import errorPage from './page/error'

function loadPage(resource) {
	return async function (url, params, query) {
		document.body.classList.add('loading')
		
		const handler = await resource()
		let page
		try {
			page = await handler.default(url, params, query)
		} catch (e) {
			console.error(e)
			if(e instanceof NotFoundError) {
				localStorage.removeItem('lang')
				page = await chooseLocale(url, [], query)
			} else {
				page = await errorPage(url, [], query)
			}
		}

		for(let current = document.body.firstChild; current != null; current = document.body.firstChild) {
			document.body.removeChild(current)
		}

		document.body.append(page.element)
		if(typeof page.attached === 'function') {
			page.attached()
		}
		document.body.classList.remove('loading')
	}
}

export const chooseLocaleHandler = loadPage(() => import('./page/chooseLocale'))
export const chooseRegionHandler = loadPage(() => import('./page/chooseRegion'))
export const exerciseHandler = loadPage(() => import('./page/exercise'))
