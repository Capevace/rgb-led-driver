const { RGBMode } = require('./RGBMode');

/**
 * Blackout mode just displays black. 
 * 
 * This is very useful for implementing on/off controls.
 *
 * **Example:**
 * ```js
 * const app = express();
 * const rgb = new RGBLEDDriver(...);
 * 	
 * // Set mode to blackout to turn the device "off"
 * app.post('/off', () => rgb.setMode('blackout'));
 *
 * // Solid mode will remember the previous color
 * app.post('/on', () => rgb.setMode('solid'));
 * ```
 * 
 * @alias BlackoutMode
 * @typicalname mode
 * @memberof module:rgb-led-driver
 * @since 1.0.0
 */
class BlackoutMode extends RGBMode {
	constructor() {
		super();

		this.type = 'blackout';
		this.color = [0, 0, 0];
	}

	tick(delta) {}
}

module.exports.BlackoutMode = BlackoutMode;