const { RGBMode } = require('./RGBMode');

/**
 * Rainbow mode rotates the hue repeatedly, creating a rainbow effect.
 *
 * **Example:**
 * ```js
 * const rgb = new RGBLEDDriver(...);
 * rgb.setMode('rainbow')
 *    .setSpeed(2); // 2 hue rotations (720deg) per second
 * ```
 * 
 * @alias RainbowMode
 * @typicalname mode
 * @memberof module:rgb-led-driver
 * @since 1.0.0
 */
class RainbowMode extends RGBMode {
	constructor() {
		super();

		this.type = 'rainbow';
		this.color = this.chroma('red').rgb();

		/**
		 * Current rainbow hue value (0-360).
		 * @type {Number}
		 */
		this.hue = 0;

		/**
		 * Number of hue rotations per second
		 * 
		 * @default 1
		 * @type {Number}
		 */
		this.speed = 1;
	}

	/**
	 * Set the rainbow hue value directly (0-360)
	 *
	 * **Example:**
	 * ```js
	 * rgb.setMode('rainbow')
	 *    .setHue(200);
	 * ```
	 * @param {number} hue The hue value
	 * @return {RainbowMode} Return `this` for chaining.
	 */
	setHue(hue) {
		this.hue = hue;

		return this;
	}

	/**
	 * Set speed in hue rotations per second
	 *
	 * **Example:**
	 * ```js
	 * rgb.setMode('rainbow')
	 *    .setSpeed(2); // num of hue rotations per second
	 * ```
	 * @param {number} speed Num of hue rotations per second
	 * @return {RainbowMode} Return `this` for chaining.
	 */
	setSpeed(speed) {
		this.speed = speed;

		return this;
	}

	tick(delta) {
		this.hue = (this.hue + (delta / 1000) * (this.speed * 360)) % 360;

		this.color = this.chroma.hsl(Math.round(this.hue), 1, 0.5).rgb();
	}
}

module.exports.RainbowMode = RainbowMode;