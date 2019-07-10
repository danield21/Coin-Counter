/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import {fetchIndex} from '../api/index'

export default async function chooseLocale() {
	const locale = localStorage.getItem('lang')
	if(locale) {
		try {
			const handler = await import('./chooseRegion')
			return await handler.default({locale})
		} catch(e) {
			localStorage.removeItem('lang')
			throw e
		}
	}

	const index = await fetchIndex()

	const frag = document.createDocumentFragment()

	for(let i in index.languages) {
		const language = index.languages[i]

		const link = document.createElement('a')
		link.append(document.createTextNode(language.title))
		link.setAttribute('class', 'index__link')
		link.setAttribute('href', `/${language.code}`)

		frag.append(link)
	}

	return {element: frag}
}
