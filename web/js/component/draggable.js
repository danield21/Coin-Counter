/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import {Coordinate} from '../coordinate'
import {Counter} from '../counter'

/**
 * DRAG_LIMIT is the maximum amount of movement allowed before it is registered as a drag
 */
const DRAG_LIMIT = 1

/**
 * DraggableComponent allows the given element to be dragged around
 */
export class DraggableComponent {
	/**
	 * Creates a draggable component that wraps around the given element
	 * as well as at the given coordinate
	 * @param {HTMLElement} element 
	 * @param {Coordinate} position 
	 */
	constructor(element, position) {
		this.element = document.createElement('div')
		this.element.appendChild(element)
		this.element.setAttribute('class', 'draggable')
		this.movement = new Counter(DRAG_LIMIT)

		setPosition(this.element, position)

		/**
		 * @type {Map<number, {current: Coordinate, diff: Coordinate}>}
		 */
		const points = new Map()

		const actions = {}
		actions.move = createPointerMove(this.element, points, this.movement)
		actions.up = createPointerUp(this.element, points, this.movement, true, actions)
		actions.cancel = createPointerUp(this.element, points, this.movement, false, actions)

		this.element.addEventListener('pointerdown', createPointerDown(this.element, points, actions))
	}

	/**
	 * Appends an event listener to the component that is passed along to the elements beneath it.
	 * Added an extra 'drag' event to control when the user drags an element along.
	 * @param {string} event to listen for
	 * @param {function} callback is the action that will be taken when the event occurs
	 */
	addEventListener(event, callback) {
		switch (event) {
			case 'drag':
				this.movement.onLimit(callback)
			default:
				this.element.addEventListener(event, callback)
		}
	}
}

/**
 * Sets the element at the specified position using the CSS trans
 * @param {HTMLElement} element
 * @param {Coordinate} coords 
 */
function setPosition(element, coords) {
	element.setAttribute('style', `transform: translateY(${coords.y}px) translateX(${coords.x}px)`)
}

/**
 * Calculates the coordinates the element is at relative to its parent
 * @param {HTMLElement} element 
 * @returns {Coordinate}
 */
function createRelativeCoordinateFromElement(element) {
	const rect = element.getBoundingClientRect()
	const absolute = new Coordinate(rect.left + window.scrollX, rect.top + window.scrollY)
	const parentRect = element.parentElement.getBoundingClientRect()
	const parentAbsolute = new Coordinate(parentRect.left + window.scrollX, parentRect.top + window.scrollY)
	return absolute.subtract(parentAbsolute)
}

/**
 * Calculates the coordinates based on on the pointer event
 * @param {PointerEvent} event
 * @returns {Coordinate}
 */
function createFromPointer(event) {
	return new Coordinate(event.pageX, event.pageY)
}

function createPointerDown(element, points, actions) {
	return function (e) {
		e.preventDefault()

		if(points.size == 0) {
			window.addEventListener('pointermove', actions.move, { passive: false })
			window.addEventListener('pointerup', actions.up, { passive: false })
			window.addEventListener('pointercancel', actions.cancel, { passive: false })
			document.body.setAttribute('touch-action', 'none')
		}

		const offset = createRelativeCoordinateFromElement(this)
		const current = createFromPointer(e)
		const diff = current.subtract(offset)

		element.classList.add('draggable--lifted')
		points.set(e.pointerId, {diff, current})
	}
}

function createPointerMove(element, points, movement) {
	return function (e) {
		e.preventDefault()

		const current = createFromPointer(e)

		var point = points.get(e.pointerId)
		if(point == null) {
			return
		}

		point.current = current.subtract(point.diff)
			
		let total = Coordinate.ZERO
		points.forEach(({current}) => {
			total = total.add(current)
		})

		const average = total.divide(points.size)
		setPosition(element, average)

		movement.count()
	}
}

function createPointerUp(element, points, movement, vibrate, actions) {
	return function (e) {
		e.preventDefault()

		points.delete(e.pointerId)

		if(points.size > 0) {
			return
		}

		if(e.pointerType !== 'mouse' && movement.triggered) {
			element.click()
		}

		window.removeEventListener('pointermove', actions.move)
		window.removeEventListener('pointerup', actions.up)
		window.removeEventListener('pointercancel', actions.cancel)
		document.body.removeAttribute('touch-action')

		element.classList.remove('draggable--lifted')

		if(vibrate && 'vibrate' in window.navigator) {
			window.navigator.vibrate(10)
		}

		movement.reset()
	}
}
