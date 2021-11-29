const { RGBLEDDriver, BaseLED } = require('rgb-led-driver');
const io = require('socket.io-client');

/**
 * An LED backend that sends color values to a Socket.io server via WebSocket
 */
class SocketIOLED extends BaseLED {
	/**
	 * Initialize a SocketIOLED
	 * @param  {string} url The Socket.io server URL
	 */
	constructor(url) {
		this.socket = io(url);

		this.socket
			.on(
				'connect', 
				(socket) => console.log('Connected', socket.id)
			);

		this.socket
			.on(
				'disconnect', 
				(socket) => console.log('Disconnected')
			);
	}

	/**
	 * Called every tick if the color has changed.
	 * RGB values are 0-255.
	 * @abstract
	 * @param {number} red
	 * @param {number} green
	 * @param {number} blue
	 */
	setRGB(red, green, blue) {
		this.socket.send('rgb', { red, green, blue });
	}

	/**
	 * Called when driver is shutdown.
	 * Use this for cleanup!
	 * @abstract
	 */
	destroy() {
		this.socket.disconnect();
	}
}


const rgb = new RGBLEDDriver({
	// lower tick speed because we send values through the network anyway
	tickSpeed: 15
});

rgb.setLED(new SocketIOLED('http://localhost:4000'));

rgb.setMode('rainbow')
	.setSpeed(1);