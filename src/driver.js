const chroma = require('chroma-js');

const { connectToLED } = require('./gatt-client');
const { defaultModes } = require('./modes');

class RGBLEDDriver {
	constructor() {
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

		this.overrides = [];

		this.interval = null;
	}

	async connect(mac = '72:16:03:00:D4:61') {
		this.led = await connectToLED(mac);

		this.setTickSpeed(this.tickSpeed);
	}

	tick() {
		try {
			const delta = Math.abs(Date.now() - this.previousTime);
			this.previousTime = Date.now();
			
			let color = this.overrides.shift();

			if (!color) {
				const mode = this.modes[this.mode];
				mode.tick(delta);
				color = mode.color;
			}

			if (chroma(...this.previousColor, 'rgb').num() !== chroma(...color, 'rgb').num()) {
				if (this.led) {
					try {
						this.led.setRGB(...color);
						this.previousColor = color;
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

		const previousColor = this.currentMode.color;

		this.mode = mode;

		this.setTransitionOverride(previousColor, this.currentMode.color);


		return this.currentMode;
	}

	setOverride(colors) {
		this.overrides = colors;
	}

	setTransitionOverride(from, to, durationinMs = 700) {
		this.setOverride(chroma.scale([chroma(from), chroma(to)]).colors(Math.floor(durationinMs / this.tickSpeed), 'rgb'));
	}

	get currentMode() {
		return this.modes[this.mode] || null;
	}
}

module.exports = {
	RGBLEDDriver
};