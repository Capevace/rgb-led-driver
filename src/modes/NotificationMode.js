const RGBMode = require('./RGBMode');
const curves = require('../helpers/curves');

module.exports = class NotificationMode extends RGBMode {
	constructor() {
		super();

		this.type = 'notification';
		this.color = this.chroma('black').rgb();
		this.tint = this.chroma('rebeccapurple');
		this.progress = 0; // 0 - this.duration * 30
		this.duration = 1000;

		this.curve = [
			...curves.logarithmic(50, 1, 1),
			...curves.exponential(50, -1),
			...curves.exponential(50, 1),
			...curves.logarithmic(100, 1, -1)
		];
	}

	setProgress(progress) {
		this.progress = progress;

		return this;
	}

	/**
	 * Set duration in seconds
	 * @param {number} duration Duration in ms
	 */
	setDuration(duration) {
		this.duration = duration;

		return this;
	}

	/**
	 * Set tint using chroma
	 * @param {Array} ...chromaArgs Chroma function args for color
	 */
	setTint(...chromaArgs) {
		this.tint = this.chroma(...chromaArgs);

		return this;
	}

	tick(delta) {
		this.progress += Math.round(this.curve.length / this.duration * delta);

		if (this.progress >= this.curve.length) {
			this.progress = 0;
			// end event
		}

		this.color = this.tint.set('hsl.l', this.curve[this.progress] * 0.5).rgb();
	}
}