const { RGBMode } = require('./RGBMode');

/**
 * Solid color mode simply displays a single color that can be changed from the outside.
 *
 * This mode should be used if you want to show static colors≥
 *
 * **Example:**
 * ```js
 * const rgb = new RGBLEDDriver(...);
 * rgb.setMode('solid')
 *    .setColor(255, 0, 0, 'rgb'); // params are passed directly to chroma-js
 *
 * rgb.currentMode
 *    .setHue(300); // change hue directly
 * ```
 * 
 * @alias SolidColorMode
 * @typicalname mode
 * @memberof module:rgb-led-driver
 * @since 1.0.0
 */
class SolidColorMode extends RGBMode {
	constructor(r, g, b) {
		super();

		this.type = 'solid';

		/**
		 * The internal HSL color values ([ h, s, l ]).
		 * @private
		 * @type {number[]}
		 */
		this._hslColor = this.chroma(r, g, b, 'rgb').hsl();
	}

	/**
	 * Solid color keeps color in a seperate hslColor variable, 
	 * so setting .color directly is not supported.
	 *
	 * @private
	 * @param  {number} value
	 */
	set color(value) {
		// not supported
	}

	/**
	 * Get color as an RGB array ([ r, g, b ]).
	 * @readonly
	 * @return {number[]}
	 */
	get color() {
		return this.chroma(...this._hslColor, 'hsl').rgb();
	}

	/**
	 * Set the color value.
	 * You can pass colors in many ways in here.
	 * Checkout [chroma-js docs](https://gka.github.io/chroma.js/) for more ways to set colors.
	 *
	 * **Example:**
	 * ```js
	 * rgb.setMode('solid')
	 *    .setColor(255, 0, 0, 'rgb') // rgb
	 *    .setColor('#00FF00') // hex
	 *    .setColor(330, 1, 0.6, 'hsl'); // hsl
	 * ```
	 * @param {any[]} chromaArguments Parameters directly passed to chroma.
	 * @return {SolidColorMode} Return `this` for chaining.
	 */
	setColor(...chromaArguments) {
		this._hslColor = this.chroma(...chromaArguments).hsl();

		return this;
	}

	/**
	 * Set a hue value directly (0-360)
	 *
	 * **Example:**
	 * ```js
	 * rgb.setMode('solid')
	 *    .setHue(200);
	 * ```
	 * @param {number} hue The hue value
	 * @return {SolidColorMode} Return `this` for chaining.
	 */
	setHue(hue) {
		let old = this._hslColor.concat([]); // copy color
		old[0] = hue;

		this._hslColor = old;

		return this;
	}

	/**
	 * Set color saturation
	 *
	 * **Example:**
	 * ```js
	 * rgb.setMode('solid')
	 *    .setHue(200)
	 *    .setSaturation(0.7);
	 * ```
	 * 
	 * @param {number} saturation Saturation (0.0...1.0)
	 * @return {SolidColorMode} Return `this` for chaining.
	 */
	setSaturation(saturation) {
		let old = this._hslColor.concat([]); // copy color
		old[1] = saturation;

		this._hslColor = old;

		return this;
	}

	/**
	 * Set color brightness
	 * 
	 * **Example:**
	 * ```js
	 * rgb.setMode('solid')
	 *    .setHue(200)
	 *    .setBrightness(0.2);
	 * ```
	 * 
	 * @param {number} brightness Brightness (0.0...1.0)
	 * @return {SolidColorMode} Return `this` for chaining.
	 */
	setBrightness(brightness) {
		let old = this._hslColor.concat([]); // copy color
		old[2] = brightness;

		this._hslColor = old;

		return this;
	}

	tick() {
		// ignore tick, color stays
	}
}

module.exports.SolidColorMode = SolidColorMode;