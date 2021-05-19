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

	tick() {
		// ignore tick, color stays
		
	}
}