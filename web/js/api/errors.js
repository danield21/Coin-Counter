/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

export class NotFoundError extends Error {
	constructor(message) {
		super(message)
	}
}

export class NotLoadedError extends Error {
	constructor(message) {
		super(message)
	}
}