import {NotFoundError} from './errors'
import {fetchIndex} from './index'
import {fetch} from './fetch'

/**
 * @typedef {{
 * 	title: string
 * 	url: string
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