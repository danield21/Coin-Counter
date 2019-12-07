/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

 /**
  * Calculates the necessary coins to be given based on the set of coins
  * @param {{name: string, value: number, size: number, locale: string, images: {front: string, back: string}}[]} coins 
  * @param {number} value 
  */
export function dispense(coins, value) {
	const sortedCoins = coins.concat()
	sortedCoins.sort((c1, c2) => c2.value - c1.value)

	const chosen = []
	let i = 0;
	while(value > 0 && i < sortedCoins.length) {
		if(sortedCoins[i].value > value) {
			i++
			continue
		}

		chosen.push(sortedCoins[i])
		value -= sortedCoins[i].value
	}
	return chosen
}
