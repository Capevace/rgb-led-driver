const chroma = require('chroma-js');

const { GATTLED } = require('./backends/GATTLED');
const { defaultModes } = require('./modes/defaultModes');

/**
 * @typedef {RGBLEDDriverOptions}
 * @property {number}   tickSpeed        - The tick interval in ms
 * @property {object}   modes            - The available modes
 * @property {Function} tickErrorHandler - The tick error handler
 */

class RGBLEDDriver {
	/**
	 * Create a new RGBLEDDriver
	 * @param  {BaseLED | null}      led      - The LED backend to use
	 * @param  {RGBLEDDriverOptions} options  - The options object
	 */
	constructor(options = {}) {
		/**
		 * Available RGBModes, indexed by key (e.g. { 'rainbow': new RainbowMode() })
		 * @type {object}
		 * @protected
		 */
		this._modes = options.modes || defaultModes();

		/**
		 * The name of the currently active mode
		 * @type {'solid' | 'rainbow'}
		 * @protected
		 */
		this._mode = 'solid';

		/**
		 * The tick interval in ms
		 * @type {number}
		 * @protected
		 */
		this._tickSpeed = options.tickSpeed || 1000 / 30;


		/**
		 * The LED backend implementation
		 * @type {BaseLED}
		 * @protected
		 */
		this._led = null;

		/**
		 * The currently active color override
		 * @type {Array}
		 * @protected
		 */
		this._overrides = [];

		/**
		 * The tick error handler
		 * @type {Function}
		 * @protected
		 */
		this._tickErrorHandler = options.tickErrorHandler || ((e) => console.error(e));

		/**
		 * The tick interval ID
		 * @type {number}
		 * @protected
		 */
		this._interval = null;

		/**
		 * The color of the previous tick.
		 * An array of RGB values [ r, g, b ].
		 * @type {Array}
		 * @protected
		 */
		this._previousColor = [0, 0, 0];

		/**
		 * The timestamp of the previous tick
		 * @type {number}
		 * @protected
		 */
		this._previousTime = Date.now();
	}

	/**
	 * Shorthand to connect using GATTLED
	 * @param  {String} mac MAC address
	 */
	connectToBLE(mac = '72:16:03:00:D4:61') {
		this.setCustomLED(new GATTLED(mac));
	}

	/**
	 * Set the LED backend and (re-)start the tick loop
	 * @param {BaseLED} led The LED backend
	 */
	setLED(led) {
		this._led = led;
		this.setTickSpeed(this._tickSpeed);
	}

	/**
	 * Set the tick speed and (re-)start the loop
	 * @param {number} ms Tick speed in ms
	 */
	setTickSpeed(ms) {
		this._tickSpeed = ms;

		if (this._interval) {
			clearInterval(this._interval);
		}

		const tickHandler = () => {
			try {
				this._tick();
			} catch (e) {
				this._tickErrorHandler(e);
			}
		};

		this._interval = setInterval(tickHandler, this._tickSpeed);
		tickHandler();
	}

	/**
	 * Set the active RGBMode
	 * @param {RGBMode}        mode 				- The new RGBMode
	 * @param {number | null}  transitionDuration	- Duration of mode transition (0 to disable)
	 * @return {RGBMode} 							- The active mode (for chaining)
	 */
	setMode(mode, transitionDuration = 700) {
		if (!(mode in this._modes)) {
			throw new Error(`Invalid mode: ${mode}`);
		}

		const previousColor = this.currentMode.color;

		this._mode = mode;

		// Process one tick so the color can update
		this.currentMode.tick(0);

		if (transitionDuration)
			this.setTransitionOverride(previousColor, this.currentMode.color, transitionDuration);


		return this.currentMode;
	}

	/**
	 * Override the current mode with a transition
	 * @param {[ r, g, b ]} from    From color array
	 * @param {[ r, g, b ]} to      To color array
	 * @param {Number} durationinMs The transition duration in ms
	 */
	setTransitionOverride(from, to, durationinMs = 700) {
		this._setOverride(chroma.scale([chroma(from), chroma(to)]).colors(Math.round(durationinMs / this._tickSpeed), 'rgb'));
	}

	/**
	 * Get the currently active RGBMode
	 * @return {RGBMode}
	 */
	get currentMode() {
		return this._modes[this._mode] || null;
	}

	/**
	 * Get all available modes
	 * @return {object}
	 */
	get modes() {
		return this._modes;
	}

	/**
	 * Set the error callback when one happens in a tick
	 * @param  {Function} fn
	 */
	onTickError(fn) {
		this._tickErrorHandler = fn;
	}

	/**
	 * Stop the RGB driver
	 */
	stop() {
		clearInterval(this._interval);

		if (this._led.destroy)
			this._led.destroy();
	}

	/**
	 * The tick function
	 * @protected
	 */
	_tick() {
		const delta = Math.abs(Date.now() - this._previousTime);
		this._previousTime = Date.now();
		
		let color = this._overrides.shift();
		if (!color) {
			const mode = this._modes[this._mode];
			mode.tick(delta);
			color = mode.color;
		}

		if (chroma(...this._previousColor, 'rgb').num() !== chroma(...color, 'rgb').num()) {
			if (this._led) {
				this._led.setRGB(...color);
				this._previousColor = color;
			} else {
				throw new Error('RGBLEDDriver has to be initialized using .connect(mac)');
			}
		}
	}

	/**
	 * Set the color array that overrides the current mode until completed.
	 * @param {Array} colors Array of RGB arrays
	 * @protected
	 */
	_setOverride(colors) {
		this._overrides = colors;
	}
}

module.exports = {
	RGBLEDDriver
};