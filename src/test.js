const chroma = require('chroma-js');
const { RGBLEDDriver, MockedLED } = require('./');
const chalk = require('chalk');

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
	const rgb = new RGBLEDDriver();
	rgb.onTickError((e) => console.error('Hi!', e));

	// Mocked connect
	rgb.setLED(new MockedLED(rgb));

	while (true) {
		rgb.setMode('solid', 0).setColor('#ff0000');

		await sleep(2000);

		rgb.setMode('solid').setColor('#00ffff');

		rgb.setTransitionOverride([255, 0, 0], [0, 255, 255], 5000);

		await sleep(7000);

		rgb.setMode('notification', 1000)
			.setDuration(1000)
			.setTint(255, 0, 255, 'rgb');

		await sleep(2000);

		rgb.setMode('rainbow').setSpeed(0.5);

		await sleep(5000);

		rgb.setMode('random').setSpeed(2);

		await sleep(10_000);
	}
}

main();
