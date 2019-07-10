/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import Navigo from 'navigo'
import { chooseLocaleHandler, chooseRegionHandler, exerciseHandler } from './pages';

document.addEventListener('DOMContentLoaded', function () {
	const router = new Navigo(window.location.origin)
	router.on({
		'/': chooseLocaleHandler,
		'/:locale': chooseRegionHandler,
		'/:locale/:region': exerciseHandler
	})
	router.resolve()
	router.notFound(chooseLocaleHandler)

	document.addEventListener('click', function (e) {
		if(e.button !== 0) {
			return
		}

		for(let elem = e.target; elem instanceof HTMLElement; elem = elem.parentElement) {
			if(!e.defaultPrevented && elem instanceof HTMLAnchorElement && elem.href) {
				e.preventDefault()
				router.navigate(elem.href, true)
				break
			}
		}
	})
})
