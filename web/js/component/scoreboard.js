/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { CoinComponent } from "./coin"

export class ScoreboardComponent {
	/**
	 * 
	 * @param {object} messages 
	 */
	constructor(messages) {
		this.element = document.createElement('div')
		this.element.setAttribute('class', 'scoreboard')
		this.rounds = []
		this.start = new Date()
		this.messages = messages
	}

	add(value, coins) {
		this.rounds.push({value, coins})
	}

	generate() {
		const end = new Date()
		let totalDiff = 0;

		const history = document.createElement('div')
		history.setAttribute('class', 'scoreboard__history')

		for(let i = 0; i < this.rounds.length; ++i) {
			let {value, coins} = this.rounds[i]

			const row = document.createElement('div')
			row.setAttribute('class', 'scoreboard__row')

			let total = 0
			for(let j = 0; j < coins.length; ++j) {
				total += coins[j].value
				const coin = new CoinComponent(coins[j])
				row.append(coin.element)
			}

			const diff = total - value
			totalDiff += diff

			history.append(row,
				createTextElement(this.messages['your-answer'] + ': ' + formatValue(value)),
				createTextElement(this.messages['correct-answer'] + ': ' + formatValue(total)),
				createTextElement(this.messages['difference'] + ': ' + formatValue(diff))
			)
		}

		const time = end - this.start
		const final = document.createElement('div')
		final.setAttribute('class', 'scoreboard__score')
		final.append(
			createTextElement(this.messages['final-difference'] + ': ' + formatValue(totalDiff)),
			createTextElement(this.messages['final-time'] + ': ' + formatTime(time))
		)

		const refreshButton = document.createElement('button')
		refreshButton.setAttribute('class', 'scoreboard__button')
		refreshButton.append(document.createTextNode(this.messages['try-again']))
		refreshButton.addEventListener('click', e => {
			e.preventDefault()
			window.location.reload()
		})

		this.element.append(final, refreshButton, history)
	}
}

function formatValue(value) {
	const absolute = Math.abs(value)
	const numbers = (""+absolute).split('')

	if(absolute < 100) {
		numbers.unshift('0')
	}
	if(absolute < 10) {
		numbers.unshift('0')
	}
	if(value < 0) {
		numbers.unshift('-')
	}

	numbers.splice(numbers.length-2, 0, '.')
	return numbers.join('')
}

function formatTime(time) {
	let drifter = time
	const milli = drifter % 1000
	drifter = Math.floor(drifter/1000)
	const seconds = drifter % 60
	drifter = Math.floor(drifter/60)
	const minutes = drifter % 60
	const hours = Math.floor(drifter/60)

	let format = ""
	if(hours > 0) {
		format += hours + ":"
	}
	
	if(minutes > 0) {
		if(hours > 0) {
			format += minutes < 10 ? `0${minutes}:` : `${minutes}:`
		} else {
			format += minutes + ':'
		}
	}
	
	if(minutes > 0) {
		format += seconds < 10 ? `0${seconds}:` : `${seconds}.`
	} else {
		format += seconds + '.'
	}
	
	format += milli < 10 ? `00${milli}` : milli < 100 ? `0${milli}` : ""+milli

	return format
}

function createTextElement(text) {
	const element = document.createElement('span')
	element.setAttribute('class', 'scoreboard__text')
	element.append(text)
	return element
}
