const RGBMode = require('./RGBMode');

module.exports = class SolidColorMode extends RGBMode {
	constructor(r, g, b) {
		super();

		this.type = 'solid';
		this.color = [r, g, b];
	}

	setColor(...chromaArguments) {
		this.color = this.chroma(...chromaArguments).rgb();

		return this;
	}

	setHue(hue) {
		this.color = this.chroma(...this.color, 'rgb')
			.set('hsl.h', hue);

		return this;
	}

	/**
	 * Set color saturation
	 * @param {number} saturation Saturation (0.0...1.0)
	 */
	setSaturation(saturation) {
		this.color = this.chroma(...this.color, 'rgb')
			.set('hsl.s', saturation);

		return this;
	}

	/**
	 * Set color brightness
	 * @param {number} brightness Brightness (0.0...1.0)
	 */
	setBrightness(brightness) {
		this.color = this.chroma(...this.color, 'rgb')
			.set('hsl.l', brightness);

		return this;
	}

	tick() {
		// ignore tick, color stays
		
	}
}