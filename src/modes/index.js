const SolidColorMode = require('./SolidColorMode');
const RainbowMode = require('./RainbowMode');
const RandomMode = require('./RandomMode');
const BlackoutMode = require('./BlackoutMode');
const NotificationMode = require('./NotificationMode');
const TransitionMode = require('./TransitionMode');

module.exports.defaultModes = function defaultModes() {
	return {
		'solid': new SolidColorMode(255, 0, 0),
		'rainbow': new RainbowMode(),
		'random': new RandomMode(),
		'blackout': new BlackoutMode(),
		'notification': new NotificationMode(),
		'transition': new TransitionMode()
	};
};