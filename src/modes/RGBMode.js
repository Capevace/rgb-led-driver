const chroma = require('chroma-js');

/**
 * RGBMode is the abstract class that all other RGB modes extend.
 *
 * **Example:**
 * ```js
 * const { RGBMode } = require('rgb-led-driver');
 * 
 * class MyCustomMode extends RGBMode {
 * 	constructor() {
 * 		super();
 * 		this.type = 'my-custom-mode';
 * 		this.color = this.chroma('red').rgb();
 * 		this.counter = 0.0;
 * 		this.speed = 1000.0;
 * 	}
 * 	
 * 	setSpeed(speed) {
 * 		this.speed = speed * 1000;
 * 		return this;
 * 	}
 * 	
 * 	tick(delta) {
 * 		this.counter += this.speed * (delta / 1000);
 * 		if (this.counter >= 1000) {
 * 			this.counter = 0.0;
 * 			this.color = this.chroma.random().rgb();
 * 		}
 * 	}
 * }
 * ```
 *
 * @abstract
 * @alias RGBMode
 * @typicalname mode
 * @memberof module:rgb-led-driver
 * @since 1.0.0
 * @see examples/custom-led-mode.js
 */
class RGBMode {
	/**
	 * Initialize the color mode.
	 */
	constructor() {
		/**
		 * The color to be used. (Type: [ r, g, b ])
		 *
		 * This value will be read and used _after_ every tick.
		 *
		 * @default [0, 0, 0]
		 * @type {number[]}
		 */
		this.color = [0, 0, 0];

		/**
		 * Mode identifier
		 *
		 * @type {String}
		 */
		this.type = 'basic';

		/**
		 * A `chroma-js` instance for easier color manipulation.
		 * @type {ChromaJS}
		 */
		this.chroma = chroma;
	}

	/**
	 * Tick function, called by default ~30 times per second.
	 *
	 * The delta time since the last frame is passed in milliseconds.
	 * 
	 * @param  {number} delta Time since last tick in ms
	 */
	tick(delta) {}
}

module.exports.RGBMode = RGBMode;