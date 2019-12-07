/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import {NotFoundError} from './errors'
import {fetchIndex} from './index'
import {fetch} from './fetch'

/**
 * @typedef {{
 * 	weight: number
 * 	currency: {
 * 		name: string
 * 		value: number
 * 		size: number
 * 		locale: string
 * 		images: {
 * 			front: string
 * 			back: string
 * 		}
 * 	}[]
 * }} CurrencyResponse
 */

/**
 * 
 * @param {string} region 
 * @returns {Promise<CurrencyResponse>}
 */
export async function fetchCurrency(region) {
	const index = await fetchIndex()
	
	for(let i in index.currencies) {
		const currency = index.currencies[i]
		if(region === currency.code) {
			return await fetch(currency.url)
		}
	}

	throw new NotFoundError(`Region ${region} not found`)
}