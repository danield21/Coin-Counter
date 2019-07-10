import {fetch} from './fetch'

/**
 * @typedef {{
 * 	languages: {
 * 		code: string,
 * 		title: string,
 * 		url: string
 * 	}[],
 * 	currencies: {
 * 		code: string,
 * 		url: string
 * 	}[]
 * }} IndexResponse
 */

/**
 * @returns {Promise<IndexResponse>}
 */
export async function fetchIndex() {
	return await fetch('/index')
}