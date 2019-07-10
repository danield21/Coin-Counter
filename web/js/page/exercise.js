/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import {ScoreboardComponent} from '../component/scoreboard'
import {DishComponent} from '../component/dish'
import {dispense} from '../dispense'
import {fetchCurrency} from '../api/currency'
import {fetchLanguage} from '../api/language'
import {fetchCoreLanguage} from '../api/messages'

const TOTAL_ROUNDS = 10

export default async function exercise({locale, region}) {
	localStorage.setItem('lang', locale)

	const language = await fetchLanguage(locale)
	const set = await fetchCurrency(region)
	const core = await fetchCoreLanguage(locale)

	const scoreboard = new ScoreboardComponent(core)
	const value = generateValue(set)
	let coins = dispense(set.currency, value)
	let dish = new DishComponent(coins)
	let currentRound = 1

	const topBar = document.createElement('div')
	topBar.setAttribute('class', 'exercise__top')

	const h1 = document.createElement('h1')
	h1.setAttribute('class', 'exercise__header')
	topBar.append(h1)

	const home = document.createElement('a')
	home.setAttribute('href', '/')
	home.append(document.createTextNode(language.title))
	h1.append(home)

	const bottomBar = document.createElement('form')
	bottomBar.setAttribute('class', 'exercise__bottom')

	const input = document.createElement('input')
	input.setAttribute('name', 'value')
	input.setAttribute('type', 'number')
	input.setAttribute('min', '0')
	input.setAttribute('step', '0.01')
	input.setAttribute('class', 'exercise__input')

	const button = document.createElement('button')
	button.setAttribute('class', 'exercise__button')
	button.append(document.createTextNode(core.get('submit')))

	bottomBar.append(input, button)

	bottomBar.addEventListener('submit', e => {
		e.preventDefault()

		const value = +input.value.replace(/\./, '')
		scoreboard.add(value, coins)

		input.value = ""
		document.body.removeChild(dish.element)

		if(currentRound < TOTAL_ROUNDS) {
			++currentRound

			const value = generateValue(set)
			coins = dispense(set.currency, value)
			dish = new DishComponent(coins)
			document.body.insertBefore(dish.element, bottomBar)
			dish.generate()
		} else {
			document.body.removeChild(bottomBar)
			document.body.append(scoreboard.element)
			scoreboard.generate()
		}
	})

	const frag = document.createDocumentFragment()
	frag.append(topBar, dish.element, bottomBar)

	return {
		element: frag,
		attached: () => dish.generate()
	}
}

function generateValue(set) {
	return Math.round(Math.random()*(set.weight - 2)) + 1
}