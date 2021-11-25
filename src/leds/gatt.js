const { BaseLED } = require('./base-led');
const { spawn } = require('child_process');

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return componentToHex(r) + componentToHex(g) + componentToHex(b);
}

class GATTLED extends BaseLED {
	/**
	 * Create a new GATTLED instance.
	 *
	 * If debug mode is enabled, `gatttool` will not actually be called.
	 * This is useful for development on machines, where gatttool isn't/can't be installed.
	 * 
	 * @param  {string}  mac          MAC address to connect to
	 * @param  {Boolean} debugOutput  Function to output debug logs
	 */
	constructor(mac, debugOutput = () => {}) {
		super();

		if (!mac) {
			throw new Error('You need to provide a MAC address to connect to');
		}

		this.mac = mac;
		this.debug = debug;
		this.debugOutput = debugOutput;

		this._connected = false;
		this._firstOutput = false;
		this._reconnectTries = 20;
		this._gatt = spawn('gatttool', ['-I', '-b', mac]);

		this._gatt.stdout
			.on('data', (data) => {
				data.toString()
					.split('\n')
					.forEach(line => {
						const normalizedLine = line.toString()
							.toLowerCase();

						this._processLine(normalizedLine);
					});
			});

		this._gatt.stderr
			.on('data', (data) => this.debugOutput(new Error(data)));

		this._gatt
			.on(
				'close', 
				(code) => this.debugOutput(new Error(`GATT exited with code ${code}`))
			);

		const destroyAndExit = () => {
			this.destroy();
			process.exit();
		};

		process.on('exit', this.destroy.bind(this));

		//catches ctrl+c event
		process.on('SIGINT', destroyAndExit);

		// catches "kill pid" (for example: nodemon restart)
		process.on('SIGUSR1', destroyAndExit);
		process.on('SIGUSR2', destroyAndExit);
	}

	/**
	 * Called every tick if the color has changed.
	 * RGB values are 0-255.
	 * @param {number} red   
	 * @param {number} green 
	 * @param {number} blue  
	 */
	setRGB(r, g, b) {
		if (!this._connected) {
			throw new Error('Not connected');
		}

		this._gatt.stdin
			.write(`char-write-cmd 9 56${rgbToHex(red, green, blue)}01F0AA\n`);
	}

	/**
	 * Called when driver is shutdown.
	 * Use this for cleanup!
	 */
	destroy() {
		this._disconnect();
		this._connected = false;
	}

	_connect() {
		this._gatt.stdin.write('connect\n');
	}

	_disconnect() {
		this._gatt.stdin.write('disconnect\n');
	}

	_processLine(line) {
		// When gatt first outputs something,
		// we use this as a signal to connect to the BLE controller
		if (!this._firstOutput) {
			this._firstOutput = true;

			this._connect();
		}

		if (line.includes('Connection successful')) {
			// Connection to controller is established
			this._connected = true;
			this._reconnectTries = 20; // reset reconnect tries
			this.debugOutput('DEBUG: CONNECTION SUCCESSFUL');
		} else if (line.includes('failed') || line.includes('error')) {
			if (this._reconnectTries > 0) {
				this._reconnectTries--;

				// Try to reconnect
				setTimeout(() => {
					this._connect();
				}, 100);
			} else {
				throw new Error('Connection Error: ' + line);
			}
		} else if (line.includes('busy')) {
			throw new Error('Device busy: ' + line);
		}
	}
}

module.exports = { GATTLED };