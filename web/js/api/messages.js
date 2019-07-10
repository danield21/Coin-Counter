/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import {NotFoundError} from './errors'
import {fetchLanguage} from './language'
import {fetch} from './fetch'

/**
 * @typedef {Map<string, string>} MessagesResponse
 */

/**
 * 
 * @param {string} locale 
 * @returns {Promise<MessagesResponse>}
 */
export async function fetchCoreLanguage(locale) {
	const language = await fetchLanguage(locale)
	
	const messages = await fetch(language.url)

	return createMap(messages)
}

/**
 * 
 * @param {string} locale 
 * @param {string} region 
 * @returns {Promise<MessagesResponse>}
 */
export async function fetchCurrencyLanguage(locale, region) {
	const language = await fetchLanguage(locale)
	
	for(let i in language.currencies) {
		const currency = language.currencies[i]
		if(region === currency.region) {
			const messages = await fetch(currency.url)
			return createMap(messages)
		}
	}

	throw new NotFoundError(`Region ${region} not found`)
}

/**
 * 
 * @param {*} obj 
 * @returns {Map<string, string>}
 */
function createMap(obj) {
	const map = new Map()

	if(obj == null) {
		return map
	}

	for(let key in obj) {
		map.set(key, obj[key])
	}

	return map
}