const { RGBLEDDriver } = require('./RGBLEDDriver');

const { BaseLED } = require('./backends/BaseLED');
const { GATTLED } = require('./backends/GATTLED');
const { MockedLED } = require('./backends/MockedLED');

const { RGBMode } = require('./modes/RGBMode');
const { BlackoutMode } = require('./modes/BlackoutMode');
const { NotificationMode } = require('./modes/NotificationMode');
const { RainbowMode } = require('./modes/RainbowMode');
const { RandomMode } = require('./modes/RandomMode');
const { SolidColorMode } = require('./modes/SolidColorMode');
const { TransitionMode } = require('./modes/TransitionMode');
const { defaultModes } = require('./modes/defaultModes');

module.exports = {
	/*
	 * Main Driver
	 */
	RGBLEDDriver,

	/*
	 * Backends
	 */
	BaseLED,
	GATTLED,
	MockedLED,

	/*
	 * Modes
	 */
	RGBMode,
	BlackoutMode,
	NotificationMode,
	RainbowMode,
	RandomMode,
	SolidColorMode,
	TransitionMode,

	defaultModes
};