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
