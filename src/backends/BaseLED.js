/**
 * BaseLED is the abstract class that you should extend if you want to create a custom LED backend.
 *
 * @alias BaseLED
 * @typicalname led
 * @memberof module:rgb-led-driver
 * @abstract
 * @example
 * 	const { BaseLED } = require('rgb-led-driver');
 *
 * 	class MyCustomLED extends BaseLED {
 * 		setRGB(r, g, b) {
 * 			// Do something with the generated color every tick
 * 		}
 * 	}
 */
class BaseLED {
	/**
	 * Called every tick if the color has changed.
	 * RGB values are 0-255.
	 * @abstract
	 * @param {number} red
	 * @param {number} green
	 * @param {number} blue
	 */
	setRGB(r, g, b) {}

	/**
	 * Called when driver is shutdown.
	 * Use this for cleanup!
	 * @abstract
	 */
	destroy() {}
}

module.exports = { BaseLED };
