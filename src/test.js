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
const { MockedLED } = require('./leds/mocked');
const readline = require('readline');
const chalk = require('chalk');

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
	const rgb = new RGBLEDDriver();
	rgb.onTickError((e) => console.error('Hi!', e));
	// Normal connect
	// await rgb.connect();
	
	// Mocked connect
	rgb.setLED(new MockedLED(rgb));

	// rgb.tick();
	// setInterval(() => rgb.tick(), 33);

	while (true) {
		rgb
			.setMode('solid', 0)
			.setColor('#ff0000');

		await sleep(2000);

		rgb
			.setMode('solid')
			.setColor('#00ffff');

		rgb.setTransitionOverride([255, 0, 0], [0, 255, 255], 5000);

		await sleep(7000);

		rgb
			.setMode('notification', 1000)
			.setDuration(1000)
			.setTint(255, 0, 255, 'rgb');

		await sleep(2000);

		rgb
			.setMode('rainbow')
			.setSpeed(0.5);

		await sleep(5000);

		rgb
			.setMode('random')
			.setSpeed(2);

		await sleep(10_000);
	}
}

main();