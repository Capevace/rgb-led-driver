const { BaseLED } = require('./base-led'); 

class GATTLED extends BaseLED {
	constructor(mac, debug = false) {
		this.mac = mac;
		this.debug = debug;
	}
}