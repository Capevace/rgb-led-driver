const RGBMode = require('./RGBMode');

module.exports = class SolidColorMode extends RGBMode {
	constructor(r, g, b) {
		super();

		this.type = 'solid';
		this.color = [r, g, b];
	}

	setColor(...chromaArguments) {
		console.log('');
		this.color = this.chroma(...chromaArguments).rgb();
	}

	tick() {
		// ignore tick, color stays
		
	}
}