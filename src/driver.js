const chroma = require('chroma-js');

const { connectToLED } = require('./gatt-client');
const { defaultModes } = require('./modes');

class RGBLEDDriver {
	constructor(tickSpeed = 33) {
		this.modes = defaultModes();

		this.previousColor = [0, 0, 0];

		/**
		 * [mode description]
		 * @type {'color' | 'fade'}
		 */
		this.mode = 'color';

		this.led = null;

		this.interval = null;
	}

	async connect(mac = '72:16:03:00:D4:61') {
		this.led = await connectToLED(mac);

		this.interval = setInterval(this.tick.bind(this), tickSpeed);
		this.tick();
	}

	tick() {
		console.log('TICK', this.currentMode.color, this.previousColor);
		try {
			const mode = this.modes[this.mode];
			mode.tick();

			if (chroma(...this.previousColor, 'rgb').num() !== chroma(...mode.color, 'rgb').num()) {
				if (this.led) {
					try {
						this.led.setRGB(...mode.color);
						this.previousColor = mode.color;
					} catch (e) {
						console.error('Error setting RGB', e);
					}
				} else {
					throw new Error('RGBLEDDriver has to be initialized using .connect(mac)');
				}
			}
		} catch (e) {
			console.error('Error in tick', e);
		}
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