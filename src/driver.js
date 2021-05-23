const chroma = require('chroma-js');

const { connectToLED } = require('./gatt-client');
const { defaultModes } = require('./modes');

class RGBLEDDriver {
	constructor({ led = null } = {}) {
		this.tickSpeed = 33;
		this.modes = defaultModes();

		this.previousColor = [0, 0, 0];
		this.previousTime = Date.now();

		/**
		 * [mode description]
		 * @type {'solid' | 'rainbow'}
		 */
		this.mode = 'solid';

		this.led = null;

		this.interval = null;
	}

	async connect(mac = '72:16:03:00:D4:61') {
		this.led = await connectToLED(mac);

		this.setTickSpeed(this.tickSpeed);
	}

	tick() {
		// console.log('TICK', this.currentMode.color, this.previousColor);
		try {
			const delta = Math.abs(Date.now() - this.previousTime);
			this.previousTime = Date.now();
			
			const mode = this.modes[this.mode];
			const isFinished = mode.tick(delta);

			// Todo: support transitions

			if (chroma(...this.previousColor, 'rgb').num() !== chroma(...mode.color, 'rgb').num()) {
				if (this.led) {
					try {
						this.led.setRGB(
							mode.color[0] || 0,
							mode.color[1] || 0,
							mode.color[2] || 0,
						);
						this.previousColor = mode.color;
					} catch (e) {
						console.error('RGB:Error', e);
					}
				} else {
					throw new Error('RGBLEDDriver has to be initialized using .connect(mac)');
				}
			}
		} catch (e) {
			console.error('TICK:Error', e);
		}
	}

	setTickSpeed(ms) {
		this.tickSpeed = ms;

		if (this.interval) {
			clearInterval(this.interval);
		}

		this.interval = setInterval(this.tick.bind(this), this.tickSpeed);
		this.tick();
	}

	setMode(mode) {
		if (!(mode in this.modes)) {
			throw new Error(`Invalid mode: ${mode}`);
		}

		this.mode = mode;

		return this.currentMode;
	}

	get currentMode() {
		return this.modes[this.mode] || null;
	}
}

module.exports = {
	RGBLEDDriver
};