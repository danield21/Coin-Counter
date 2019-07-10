/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import {CoinComponent} from './coin'
import {DraggableComponent} from './draggable'

/**
 * Manages a DOM element that contains coins and allows such coins to be dragged around
 */
export class DishComponent {
	/**
	 * Creates a dish based on the coins that are passed
	 * @param {{name: string, value: number, size: number, images: {front: string, back: string}}[]}coins 
	 * @param {number} value 
	 */
	constructor(coins) {
		this.element = document.createElement('div')
		this.element.setAttribute('class', 'dish')
		this.coins = coins
	}

	/**
	 * Renders the coin.
	 * Only call this method after attached to the DOM
	 */
	generate() {
		const frag = document.createDocumentFragment()

		let remaining = this.value
		const height = this.element.offsetHeight
		const width = this.element.offsetWidth
		
		const mmElem = document.createElement('div')
		mmElem.setAttribute('style', 'width: 100mm;')
		this.element.append(mmElem)
		const mmRatio = mmElem.offsetWidth / 100;
		this.element.removeChild(mmElem)

		for(let i = 0; i < this.coins.length; ++i) {
			if(this.coins[i].value > remaining) {
				i++
				continue
			}

			const realSize = this.coins[i].size*mmRatio;
			const hypoSize = Math.sqrt(2*realSize*realSize)
			const position = {
				x: (width > hypoSize ? width - hypoSize : 0)*Math.random(),
				y: (height > hypoSize ? height - hypoSize : 0)*Math.random(),
				rotate: 360*Math.random()
			}

			const coin = new CoinComponent(this.coins[i])
			coin.rotate(position.rotate)
			if(Math.random() >= 0.5) {
				coin.flip()
			}

			const draggable = new DraggableComponent(coin.element, position)
			draggable.element.classList.add('coin-wrapper')
			draggable.onDrag(type => {
				coin.skipFlip = true

				let sibling = draggable.element.nextElementSibling
				while(sibling != null) {
					this.element.insertBefore(sibling, draggable.element)
					sibling = sibling.nextElementSibling
				}
			})
			draggable.onClick(e => {
				coin.flip()
			})
			frag.append(draggable.element)

			remaining -= this.coins[i].value
		}

		this.element.append(frag)
	}
}