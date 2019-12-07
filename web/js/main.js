/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { chooseLocaleHandler, chooseRegionHandler, exerciseHandler } from './pages';
import {Router} from './router'

document.addEventListener('DOMContentLoaded', function () {
	const routes = new Map()
	routes.set('/', chooseLocaleHandler)
	routes.set(/^\/(\w+)$/, chooseRegionHandler)
	routes.set(/^\/(\w+)\/(\w+)$/, exerciseHandler)

	const router = new Router(routes, chooseLocaleHandler)
	router.navigate()

	document.addEventListener('click', function (e) {
		if(e.button !== 0) {
			return
		}

		for(let elem = e.target; elem instanceof HTMLElement; elem = elem.parentElement) {
			if(!e.defaultPrevented && elem instanceof HTMLAnchorElement && elem.href) {
				e.preventDefault()
				history.pushState(null, null, elem.pathname)
				router.navigate(elem.pathname)
				break
			}
		}
	})

	window.addEventListener('popstate', () => router.navigate())
})
