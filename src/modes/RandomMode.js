const { RGBMode } = require('./RGBMode');

module.exports.RandomMode = class RandomMode extends RGBMode {
	constructor() {
		super();

		this.type = 'random';
		this.color = this.chroma('red').rgb();
		this.counter = 0.0;
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