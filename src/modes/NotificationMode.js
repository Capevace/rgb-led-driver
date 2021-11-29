const { RGBMode } = require('./RGBMode');
const curves = require('../helpers/curves');

/**
 * Notification mode will flash a color to signify a notification.
 *
 * **Example:**
 * ```js
 * const rgb = new RGBLEDDriver(...);
 * io.on('connection', socket => {
 * 	socket.on('notification', () => {
 * 		const oldMode = rgb.currentMode.type;
 * 			
 * 		rgb.setMode('notification', 250)
 * 		   .setDuration(1000);
 *
 * 		// After transition (250) + animation duration (1000) = 1250ms
 * 		// we return to the previous mode
 * 		setTimeout(() => {
 * 			rgb.setMode(oldMode);
 * 		}, 1250);
 * 	})
 * });
 * ```
 * 
 * @alias NotificationMode
 * @typicalname mode
 * @memberof module:rgb-led-driver
 * @since 1.0.0
 */
class NotificationMode extends RGBMode {
	constructor() {
		super();

		this.type = 'notification';
		this.color = this.chroma('black').rgb();

		/**
		 * The notification tint color.
		 * It is recommended to use {@link NotificationMode#setTint} instead.
		 * 
		 * **Example:**
		 * ```js
		 * rgb.currentMode.tint = chroma('#fff');
		 * ```
		 * @see {NotificationMode#setTint}
		 * @type {module:chroma-js~color}
		 */
		this.tint = this.chroma('rebeccapurple');

		/**
		 * The progress index used to iterate through the animation curve.
		 *
		 * @default 0
		 * @see {NotificationMode#setProgress}
		 * @type {Number}
		 */
		this.progress = 0; // 0 - this.duration * 30

		/**
		 * The animation duration in ms.
		 *
		 * @default 1000
		 * @see {NotificationMode#setDuration}
		 * @type {Number}
		 */
		this.duration = 1000;

		/**
		 * The brightness curve used for the color animation.
		 * @type {Float32Array}
		 */
		this.curve = [
			...curves.logarithmic(50, 1, 1),
			...curves.exponential(50, -1),
			...curves.exponential(50, 1),
			...curves.logarithmic(100, 1, -1),
		];
	}

	/**
	 * Helper method to set the progress index of the animation.
	 * This index should not exceed the brightness curve.
	 * 
	 * @param {number} progress The progress index.
	 * @return {NotificationMode} Return `this` for chaining.
	 */
	setProgress(progress) {
		this.progress = progress;

		return this;
	}

	/**
	 * Set duration in milliseconds
	 * @param {number} duration Duration in ms
	 * @return {NotificationMode} Return `this` for chaining.
	 */
	setDuration(duration) {
		this.duration = duration;

		return this;
	}

	/**
	 * Set the tint of the notification animation.
	 * Checkout [chroma-js docs](https://gka.github.io/chroma.js/) for more ways to set colors.
	 *
	 * **Example:**
	 * ```js
	 * rgb.setMode('notification')
	 *    .setTint(255, 0, 0, 'rgb') // rgb
	 *    .setTint('#00FF00') // hex
	 *    .setTint(330, 1, 0.6, 'hsl'); // hsl
	 * ```
	 * @param {any[]} chromaArguments Parameters directly passed to chroma.
	 * @return {NotificationMode} Return `this` for chaining.
	 */
	setTint(...chromaArgs) {
		this.tint = this.chroma(...chromaArgs);

		return this;
	}

	tick(delta) {
		this.progress += Math.round(
			(this.curve.length / this.duration) * delta
		);

		if (this.progress >= this.curve.length) {
			this.progress = 0;
			// end event
		}

		this.color = this.tint
			.set('hsl.l', this.curve[this.progress] * 0.5)
			.rgb();
	}
}

module.exports.NotificationMode = NotificationMode;