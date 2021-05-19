const SolidColorMode = require('./SolidColorMode');
const RainbowMode = require('./RainbowMode');

module.exports.defaultModes = function defaultModes() {
	return {
		'color': new SolidColorMode(255, 0, 0),
		'rainbow': new RainbowMode()
	};
};