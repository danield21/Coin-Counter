/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

 /**
  * Coordinate defines various operations used for coordinates
  */
export class Coordinate {
	/**
	 * Creates a Coordinate based on the given parameters
	 * @param {number} x 
	 * @param {number} y 
	 */
	constructor(x, y) {
		this.x = x
		this.y = y
	}

	/**
	 * Adds two coordinate together
	 * @param {Coordinate} other
	 */
	add(other) {
		return new Coordinate(this.x + other.x, this.y + other.y)
	}

	/**
	 * Diffs two coordinate
	 * @param {Coordinate} other
	 */
	subtract(other) {
		return new Coordinate(this.x - other.x, this.y - other.y)
	}

	/**
	 * Mutliples the coordinate by a factor
	 * @param {number} n 
	 */
	mutliply(n) {
		return new Coordinate(this.x * n, this.y * n)
	}

	/**
	 * Divides the coordinate by a factor
	 * @param {number} n 
	 */
	divide(n) {
		return new Coordinate(this.x / n, this.y / n)
	}
}

/**
 * Represents the coordinate found at (0, 0)
 */
Coordinate.ZERO = new Coordinate(0, 0)