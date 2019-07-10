import {fetchLanguage} from '../api/language'

export default async function chooseLanguage({locale}) {
	localStorage.setItem('lang', locale)
	const language = await fetchLanguage(locale)

	const frag = document.createDocumentFragment()

	const h1 = document.createElement('h1')
	h1.setAttribute('class', 'index__header')
	h1.append(document.createTextNode(language.title))
	frag.append(h1)

	for(let i in language.currencies) {
		const currency = language.currencies[i]

		const link = document.createElement('a')
		link.append(document.createTextNode(currency.title))
		link.setAttribute('class', 'index__link')
		link.setAttribute('href', `/${locale}/${currency.code}`)

		frag.append(link)
	}

	return {element: frag}
}