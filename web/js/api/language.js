/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import {NotFoundError} from './errors'
import {fetchIndex} from './index'
import {fetch} from './fetch'

/**
 * @typedef {{
 * 	title: string
 * 	text: Map<string, string>
 * 	currencies: {
 * 		code: string
 * 		title: string
 * 		url: string
 * 	}[]
 * }} LanguageResponse
 */

/**
 * 
 * @param {string} locale 
 * @returns {Promise<LanguageResponse>}
 */
export async function fetchLanguage(locale) {
	const index = await fetchIndex()
	
	for(let i in index.languages) {
		const language = index.languages[i]
		if(locale === language.code) {
			return await fetch(language.url)
		}
	}

	throw new NotFoundError(`Locale ${locale} not found`)
}
