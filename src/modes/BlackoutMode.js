const RGBMode = require('./RGBMode');

module.exports = class BlackoutMode extends RGBMode {
	constructor() {
		super();

		this.type = 'blackout';
		this.color = [0,0,0];
	}

	tick(delta) {
		
	}
}