export class Counter {
	constructor(max) {
		this.current = 0
		
		this.max = max
		this.triggered = false
		this.callbacks = []
	}

	count() {
		if(this.triggered) {
			return
		}
		
		if(this.current >= this.max) {
			this.triggered = true
			for(let i = 0; i < this.callbacks.length; ++i) {
				try {
					this.callbacks[i]()
				} catch(e) {
					console.error(e)
				}
			}
		} else {
			this.current++
		}
	}

	reset() {
		this.triggered = false
		this.current = 0
	}

	onLimit(func) {
		if(typeof func !== 'function') {
			return
		}

		this.callbacks.push(func)
	}
}