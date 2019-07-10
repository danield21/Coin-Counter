/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/**
 * A Coin Component contains a HTML representation of the coin.
 * In order to attach it to the DOM, use the `element` property.
 */
export class CoinComponent {
	/**
	 * Creates a Coin Component
	 * @param {{name: string, value: number, size: number, images: {front: string, back: string}}} coin contains the information required to render a coin
	 */
	constructor(coin) {
		/**
		 * @member {HTMLDivElement} element is a HTML representation of the coin
		 */
		this.element = document.createElement('div')
		/**
		 * @member {boolean} skipFlip if set to `true`, then the next flip is skipped and this value is reset
		 */
		this.skipFlip = false

		this.element.setAttribute('class', 'coin')
		this.element.setAttribute('style', `width: ${coin.size}mm; height: ${coin.size}mm;`)

		this.element.append(createCoinSide(coin, 'front'))
		this.element.append(createCoinSide(coin, 'back'))
	}

	/**
	 * Toggles the `coin--face-down` class
	 * If `this.skipFlip` is set to true, the next flip is skipped and `this.skipFlip` is reset
	 */
	flip() {
		if(this.skipFlip) {
			this.skipFlip = false
			return
		}
		this.element.classList.toggle('coin--face-down')
	}

	/**
	 * Rotates the coin to the set angle
	 * @param {number} angle 
	 */
	rotate(angle) {
		const first = this.element.firstChild;
		const second = first.nextSibling;
		first.firstChild.setAttribute('style', `transform: rotate(${angle}deg)`)
		second.firstChild.setAttribute('style', `transform: rotate(${angle}deg)`)
	}
}

/**
 * 
 * @param {{name: string, value: number, size: number, images: {front: string, back: string}}} coin 
 * @param {string} side Should be a property that coin.images has, such as `front` or `back`
 * @returns {HTMLDivElement}
 */
function createCoinSide(coin, side) {
	if(!(side in coin.images)) {
		throw new TypeError('Excepted only the strings "front" or "back')
	}

	const wrapper = document.createElement('div')
	wrapper.setAttribute('class', `coin__${side}`)

	const img = document.createElement('img')
	img.setAttribute('src', coin.images[side])
	img.setAttribute('alt', coin.name)
	img.setAttribute('class', 'coin__img')
	wrapper.append(img)

	return wrapper
}
