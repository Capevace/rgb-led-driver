const { RGBMode } = require('./RGBMode');
const curves = require('../helpers/curves');

class TransitionMode extends RGBMode {
	constructor(from, to, duration) {
		super();

		this.type = 'transition';
		this.color = this.chroma('black').rgb();
		this.tint = this.chroma('rebeccapurple');
		this.progress = 0; // 0 - this.duration * 30
		this.duration = 1000;

		this.curve = [
			...curves.logarithmic(50, 1, 1),
			...curves.exponential(50, -1),
			...curves.exponential(50, 1),
			...curves.logarithmic(100, 1, -1),
		];

		this.setTransition('#000000', '#000000', 1000);
	}

	/**
	 * Set transition parameters
	 *
	 * @param {string} from     Hex color start
	 * @param {string} to       Hex color end
	 * @param {number} duration Duration in ms
	 */
	setTransition(from, to, duration) {
		this.colors = this.chroma
			.scale([from, to])
			.mode('lch')
			.colors((this.duration / 1000) * 30);
	}

	setProgress(progress) {
		this.progress = progress;

		return this;
	}

	/**
	 * Set duration in seconds
	 * @param {number} duration Duration in seconds
	 * @return {this} Return `this` for chaining.
	 */
	setDuration(duration) {
		this.duration = duration;

		return this;
	}

	tick(delta) {
		this.progress += Math.round(0.03 * delta);

		if (this.progress >= this.colors.length) {
			this.progress = 0;
			// end event
			// returning true means mode has ended
			return true;
		}

		this.color = this.chroma(this.colors[this.progress]).rgb();
	}
}

module.exports.TransitionMode = TransitionMode;
