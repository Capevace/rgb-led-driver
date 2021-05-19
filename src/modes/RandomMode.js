const RGBMode = require('./RGBMode');

module.exports = class RandomMode extends RGBMode {
	constructor() {
		super();

		this.type = 'random';
		this.color = this.chroma('red').rgb();
		this.counter = 0.0;
		this.speed = 1000.0;
	}

	setHue(hue) {
		this.hue = hue;
	}

	setSpeed(speed) {
		this.speed = speed;
	}

	tick(delta) {
		console.log(this.counter, delta, this.speed * (delta / 1000));
		this.counter += this.speed * (delta / 1000);
		if (this.counter >= 1000) {
			this.counter = 0.0;
			this.color = this.chroma.random().rgb();
		}
	}
}