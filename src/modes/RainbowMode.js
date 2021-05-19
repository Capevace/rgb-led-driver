const RGBMode = require('./RGBMode');

module.exports = class RainbowMode extends RGBMode {
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

	setSpeed(speed) {
		this.speed = speed;

		return this;
	}

	tick() {
		this.hue = (this.hue + (1 * this.speed)) % 360;
		
		this.color = this.chroma.hsl(Math.round(this.hue), 1, 0.5).rgb();
	}
}