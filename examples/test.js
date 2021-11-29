const chroma = require('chroma-js');
const { RGBLEDDriver, BaseLED } = require('../');
const chalk = require('chalk');
const fs = require('fs/promises');
const readline = require('readline');

class TestableLED extends BaseLED {
	constructor(stack, recording = false) {
		super();

		this.index = 0;
		this.recording = process.argv.includes('--record') || recording || false;
		this.stack = this.recording
			? []
			: stack || [];

		this.failed = false;
		this.progressState = new Array(50)
			.fill(null);
	}

	setRGB(r, g, b) {
		if (this.recording) {
			this.stack.push([ r, g, b ]);
		} else {
			if (this.index < this.stack.length) {
				const color = this.stack[this.index];

				if (color[0] !== r || color[1] !== g || color[2] !== b) {
					this.failed = true;
					this.progress(true);
				} else {
					this.progress(false);
				}
			} else {
				console.log('[Stack finished]');
				console.log(`Test: ${this.failed ? 'Failed 🚫' : 'Succeeded ✅'}`);
				console.log(`Errors at: 
${this.progressState
	.map((error, i) => error === true ? i : null)
	.filter(v => !!v)
	.join(', ')
}`);			
				this.stop();
			}
		}

		this.index++;
	}

	progress(error = false) {
		const index = Math.floor((this.index / this.stack.length) * this.progressState.length);
		this.progressState[index] = error;

		readline.clearLine(process.stdout, 0);
		readline.cursorTo(process.stdout, 0);

		const bar = this.progressState
			.map(error => 
				error === null 
					? ' ' 
					: error === true 
						? 'X' 
						: '-'
			)
			.join('');

		process.stdout.write(`|${bar}| ${Math.floor(index / this.progressState.length) * 100}%`);
	}

	stop(noExit = false) {
		if (this.recording) {
			console.log(JSON.stringify(this.stack));
		}

		if (noExit) {
			return this.failed;
		} else {
			process.exit(this.failed ? 1 : 0);
		}
	}
}

async function main() {
	const recording = process.argv.includes('--record');
	let testData = [];

	if (!recording) {
		testData = require('./test.json');
	}

	const rgb = new RGBLEDDriver();
	rgb.onTickError((e) => console.error('Hi!', e));

	const led = new TestableLED(testData, recording);
	rgb.setLED(led);

	while (true) {
		rgb.setMode('solid', 0).setColor('#ff0000');

		await rgb.sleep(2000);

		rgb.setMode('solid').setColor('#00ffff');

		rgb.setTransitionOverride([255, 0, 0], [0, 255, 255], 5000);

		await rgb.sleep(7000);

		rgb.setMode('notification', 1000)
			.setDuration(1000)
			.setTint(255, 0, 255, 'rgb');

		await rgb.sleep(2000);

		rgb.setMode('rainbow').setSpeed(0.5);

		await rgb.sleep(5000);

		rgb.setMode('random').setSpeed(2);

		await rgb.sleep(10_000);

		led.stop();
	}
}

main();
