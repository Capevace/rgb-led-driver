const chalk = require('chalk');
const readline = require('readline');
const { BaseLED } = require('./BaseLED');

const clear = true;
function logColor(r, g, b, mode) {
    // readline.clearLine(process.stdout);
    
}

class MockedLED extends BaseLED {
	constructor(driver, withNewline = false, size = { x: 10, y: 10 }) {
		super();

		this.driver = driver;
		this.withNewline = withNewline;
		this.overridesMax = null;
		this.size = size;

		process.stdout.write('\n'.repeat(this.size.y));
	}

	/**
	 * Called every tick if the color has changed.
	 * RGB values are 0-255.
	 * @abstract
	 * @param {number} red   
	 * @param {number} green 
	 * @param {number} blue  
	 */
	setRGB(r, g, b) {
		// A new override was set
		if (!this.overridesMax && this.driver._overrides.length > 0) {
			this.overridesMax = this.driver._overrides.length;
		} else if (this.overridesMax && this.driver._overrides.length === 0) {
			this.overridesMax = null;
		}

		const transitionPercent = Math.round(100 - (100 / this.overridesMax * this.driver._overrides.length));
		const transitionDuration = this.overridesMax * this.driver._tickSpeed;
		const transitionLabel = this.driver._overrides.length > 0 
		? `` 
		: 'none';

		const colorBlock = chalk.rgb(r, g, b)('█'.repeat(this.size.x * 2));
		let text = '';

		for (let i = 0; i < this.size.y; i++) {
			text += colorBlock;

			switch (i - 1) {
				case 0:
					text += ` Mode: ${this.driver.currentMode.type}`;
					break;
				case 2:
					text += ` Transition`;
					break;
				case 3:
					text += `  Duration: `;
					
					if (this.driver._overrides.length > 0)
						text += `${transitionDuration}ms`;
					break;
				case 4:
					text += `  Percent:  `;

					if (this.driver._overrides.length > 0)
						text += `${transitionPercent}%`;
					break;
				case 6:
					text += ` Tick Interval: ${this.driver._tickSpeed}ms`;
					break;
				case 7:
					text += ` FPS: ${Math.round(1000 / this.driver._tickSpeed)}`;
					break;
			}

			text += '\n';
		}

		if (!this.withNewline) {
			for (let i = 0; i < this.size.y; i++) {
				readline.moveCursor(process.stdout, 0, -1);
				readline.clearLine(process.stdout, 0);
				readline.cursorTo(process.stdout, 0);
			}
			
			readline.cursorTo(process.stdout, 0);
			process.stdout.write(text);
		} else {
			console.log(text);
		}
	}

	/**
	 * Called when driver is shutdown.
	 * Use this for cleanup!
	 * @abstract
	 */
	destroy() {}
}

module.exports = { MockedLED };