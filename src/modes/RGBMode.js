const chroma = require('chroma-js');

module.exports = class RGBMode {
	constructor() {
		this.color = [0, 0, 0];
		this.type = 'basic';
		this.chroma = chroma;
	}

	tick(delta) {

	}
}