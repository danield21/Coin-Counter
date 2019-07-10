/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

export default async function errorPage() {
	const frag = document.createDocumentFragment()

	const tryAgain = document.createElement('button')
	tryAgain.append(document.createTextNode('Try Again'))
	tryAgain.setAttribute('class', 'index__link')
	tryAgain.addEventListener('click', () => window.location.href = window.location.href)

	const home = document.createElement('button')
	home.append(document.createTextNode('Home'))
	home.setAttribute('class', 'index__link')
	home.addEventListener('click', () => window.location.href = '/')

	frag.append(tryAgain, home)

	return frag
}
