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