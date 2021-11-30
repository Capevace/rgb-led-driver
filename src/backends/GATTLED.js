const { BaseLED } = require('./BaseLED');
const { spawn } = require('child_process');

function componentToHex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? '0' + hex : hex;
}

function rgbToHex(r, g, b) {
	return componentToHex(r) + componentToHex(g) + componentToHex(b);
}

/**
 * GATTLED will connect to Bluetooth Low Energy based devices via `gatttool`.
 *
 * Note: You will probably need to install `gatttool` in order for this to work.
 *
 * @alias GATTLED
 * @typicalname led
 * @memberof module:rgb-led-driver
 * @example
 * 	const { RGBLEDDriver, GATTLED } = require('rgb-led-driver');
 *
 * 	const rgb = new RGBLEDDriver();
 * 	const led = new GATTLED(
 * 		'<MAC ADDRESS of BLE device>',
 * 		(msg) => console.log('Debug Log', msg)
 * 	);
 *
 * 	rgb.setLED(led);
 */
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
	constructor(mac, debugOutput = (msg, err = null) => {}) {
		super();

		if (!mac) {
			throw new Error('You need to provide a MAC address to connect to');
		}

		this.debugOutput = debugOutput;
		
		this._mac = mac;

		this._connected = false;
		this._firstOutput = false;
		this._reconnectTries = 20;
		this._gatt = spawn('gatttool', ['-I', '-b', mac]);

		this._gatt.stdout.on('data', (data) => {
			data.toString()
				.split('\n')
				.forEach((line) => {
					try {
						const normalizedLine = line.toString().toLowerCase();

						this._processLine(normalizedLine);
					} catch (e) {
						this.debugOutput(`[ERROR] GATTLED: ${e.message}`, e);
					}
				});
		});

		this._gatt.stderr.on('data', (data) => {
			const message = data.toString();
			this.debugOutput(
				`[ERROR] gatttool: ${message}`,
				new Error(message)
			);
		});

		this._gatt.on('close', (code) =>
			this.debugOutput(`[INFO] gatttool exited with code ${code}`)
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
	setRGB(red, green, blue) {
		if (!this._connected) {
			throw new Error(
				'No gatttool connection to BLE device when setting RGB'
			);
		}

		this._gatt.stdin.write(
			`char-write-cmd 9 56${rgbToHex(red, green, blue)}01F0AA\n`
		);
	}

	/**
	 * Called when driver is shutdown.
	 * Use this for cleanup!
	 */
	destroy() {
		this._disconnect();
		this._gatt.kill();
		this._connected = false;
	}

	_connect() {
		this.debugOutput(
			`[INFO] gatttool: trying to connect (tries left: ${this._reconnectTries})`
		);
		this._gatt.stdin.write('connect\n');
	}

	_disconnect() {
		this.debugOutput('[INFO] gatttool: sending disconnect');
		this._gatt.stdin.write('disconnect\n');
	}

	_processLine(line) {
		this.debugOutput(`[OUTPUT] gatttool: ${line}`);

		// When gatt first outputs something,
		// we use this as a signal to connect to the BLE controller
		if (!this._firstOutput) {
			this._firstOutput = true;

			this._connect();
		}

		if (line.includes('connection successful')) {
			// Connection to controller is established
			this._connected = true;
			this._reconnectTries = 20; // reset reconnect tries

			this.debugOutput(
				`[INFO] gatttool: connection to ${this._mac} established`
			);
		} else if (line.includes('failed') || line.includes('error')) {
			this.debugOutput(`[ERROR] gatttool: connection failed: ${line}`);

			if (this._reconnectTries > 0) {
				this._reconnectTries--;

				// Try to reconnect
				setTimeout(() => {
					this._connect();
				}, 1000);
			} else {
				throw new Error('Unable to connect: ' + line);
			}
		} else if (line.includes('busy')) {
			throw new Error('Device busy: ' + line);
		}
	}
}

module.exports = { GATTLED };
