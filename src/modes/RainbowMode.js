const { RGBMode } = require('./RGBMode');

module.exports.RainbowMode = class RainbowMode extends RGBMode {
	constructor() {
		super();

		this.type = 'rainbow';
		this.color = this.chroma('red').rgb();
		this.hue = 0;
		this.speed = 1;
	}

	setHue(hue) {
		this.hue = hue;

		return this;
	}

	/**
	 * Set speed in hue rotations per second
	 * @param {number} speed Num of hue rotations per second
	 */
	setSpeed(speed) {
		this.speed = speed;

		return this;
	}

	tick(delta) {
		this.hue = (this.hue + (delta / 1000) * (this.speed * 360)) % 360;

		this.color = this.chroma.hsl(Math.round(this.hue), 1, 0.5).rgb();
	}
};
