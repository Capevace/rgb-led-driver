const { spawn } = require('child_process');
const { LED } = require('./led'); 

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return componentToHex(r) + componentToHex(g) + componentToHex(b);
}

async function connectToLED(mac, debug = () => {}) {
	const gatt = spawn('gatttool', ['-I', '-b', mac]);
	
	let firstInput = false;
	let connected = false;

	const commands = {
		/**
		 * Connect (called when driver has been initialized)
		 */
		connect() {
			gatt.stdin.write('connect\n');
		},

		/**
		 * Disconnect (called on shutdown etc.)
		 */
		disconnect() {
			gatt.stdin.write('disconnect\n');
		},

		/**
		 * If LED is connected
		 * @return {Boolean}
		 */
		isConnected() {
			return connected;
		},

		/**
		 * Called every tick if the color has changed.
		 * RGB values are 0-255.
		 * @param {number} red   
		 * @param {number} green 
		 * @param {number} blue  
		 */
		setRGB(red, green, blue) {
			if (!connected) {
				throw new Error('Not connected');
			}

			gatt.stdin.write(`char-write-cmd 9 56${rgbToHex(red, green, blue)}01F0AA\n`);
		}
	};

	let reconnectTries = 20;

	function processLine(line) {
		debug('OUT:', line);

		if (!firstInput) {
			firstInput = true;

			commands.connect();
		}

		const normalizedLine = line.toLowerCase();

		if (line.includes('Connection successful')) {
			connected = true;
			debug('DEBUG: CONNECTION SUCCESSFUL');
		} else if (normalizedLine.toLowerCase().includes('failed') || normalizedLine.toLowerCase().includes('error')) {
			if (reconnectTries > 0) {
				reconnectTries--;

				// Try to reconnect
				setTimeout(() => {
					commands.connect();
				}, 100);
			} else {
				throw new Error('Connection Error: ' + line);
			}
		} else if (line.toLowerCase().includes('busy')) {
			throw new Error('Device busy: ' + line);
		}
	}

	gatt.stdout.on('data', (data) => {
		data.toString()
			.split('\n')
			.forEach(line => processLine(line.toString()));
	});

	gatt.stderr.on('data', (data) => {
		debug(`ERR: ${data}`);
	});

	gatt.on('close', (code) => {
		debug(`DEBUG:child process exited with code ${code}`);
	});

	function exitHandler(options, exitCode) {
	    commands.disconnect();
	    connected = false;
	    
	    if (options.exit) process.exit();
	}

	//do something when app is closing
	process.on('exit', exitHandler.bind(null,{cleanup:true}));

	//catches ctrl+c event
	process.on('SIGINT', exitHandler.bind(null, {exit:true}));

	// catches "kill pid" (for example: nodemon restart)
	process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
	process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

	//catches uncaught exceptions
	// process.on('uncaughtException', );

	return commands;
}

module.exports.connectToLED = connectToLED;