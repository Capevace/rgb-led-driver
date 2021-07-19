// 	const readline = require('readline');
// 	readline.emitKeypressEvents(process.stdin);
// 	process.stdin.setRawMode(true);
// 	process.stdin.on('keypress', (str, key) => {
// 	  if (key.ctrl && key.name === 'c') {
// 	    process.exit();
// 	  } else if (key.name === 'c') {
// 	  	commands.connect();
// 	  } else if (key.name === 'd') {
// 	  	commands.disconnect();
// 	  	connected = false;
// 	  } else if (key.name === 'r') {
// 	  	fade = false;
// 	  	commands.sendRGB(255, 0, 0);
// 	  } else if (key.name === 'g') {
// 	  	fade = false;
// 	  	commands.sendRGB(0, 255, 0);
// 	  } else if (key.name === 'b') {
// 	  	fade = false;
// 	  	commands.sendRGB(0, 0, 255);
// 	  } else if (key.name === 'f') {
// 	  	fade = true;
// 	  }
// });

const chroma = require('chroma-js');
const { RGBLEDDriver } = require('./driver');
const readline = require('readline');
const chalk = require('chalk');

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function mockLED(rgb) {
	return {
		setRGB(r, g, b) {
			logColor(r,g,b, rgb.mode);
		}
	}
}

const clear = true;
function logColor(r, g, b, mode) {
    // readline.clearLine(process.stdout);
    const text = chalk.rgb(r, g, b)('██████████ ') + mode;

    if (clear) {
    	readline.clearLine(process.stdout);
    	readline.cursorTo(process.stdout, 0);
    	process.stdout.write(text);
    } else {
    	console.log(text);
    }
}

async function main() {
	const rgb = new RGBLEDDriver();
	// Normal connect
	// await rgb.connect();
	
	// Mocked connect
	rgb.led = mockLED(rgb);
	rgb.setTickSpeed(rgb.tickSpeed);

	// rgb.tick();
	// setInterval(() => rgb.tick(), 33);

	while (true) {
		rgb
			.setMode('transition')
			.setTransition('#000000', '#ffffff', 5000);

		await sleep(5000);


		rgb
			.setMode('notification')
			// .setColor(255, 0, 255, 'rgb');

		await sleep(10000);

		rgb
			.setMode('rainbow')
			.setSpeed(0.5);

		await sleep(2000);

		rgb
			.setMode('random')
			.setSpeed(2);

		await sleep(10_000);
	}
}

main();