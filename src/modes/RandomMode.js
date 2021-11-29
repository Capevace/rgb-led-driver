const { RGBMode } = require('./RGBMode');

/**
 * Random mode sets a random color in specified intervals.
 *
 * **Example:**
 * ```js
 * const rgb = new RGBLEDDriver(...);
 * rgb.setMode('random')
 *    .setSpeed(2); // num of colors per second
 * ```
 * 
 * @alias RandomMode
 * @typicalname mode
 * @memberof module:rgb-led-driver
 * @since 1.0.0
 */
class RandomMode extends RGBMode {
	constructor() {
		super();

		this.type = 'random';
		this.color = this.chroma('red').rgb();

		/**
		 * Counter for random interval.
		 * @default 0.0
		 * @type {Number}
		 */
		this.counter = 0.0;

		/**
		 * Time interval for color changes in ms.
		 * 
		 * @default 1000.0
		 * @type {Number}
		 */
		this.speed = 1000.0;
	}

	/**
	 * Set speed in per seconds
	 * @param {number} speed Num of colors per second (1 = 1 per second)
	 */
	setSpeed(speed) {
		this.speed = speed * 1000;

		return this;
	}

	tick(delta) {
		this.counter += this.speed * (delta / 1000);
		if (this.counter >= 1000) {
			this.counter = 0.0;
			this.color = this.chroma.random().rgb();
		}
	}
}

module.exports.RandomMode = RandomMode;