const { BlackoutMode } = require('./BlackoutMode');
const { NotificationMode } = require('./NotificationMode');
const { RainbowMode } = require('./RainbowMode');
const { RandomMode } = require('./RandomMode');
const { TransitionMode } = require('./TransitionMode');
const { SolidColorMode } = require('./SolidColorMode');

module.exports.defaultModes = function defaultModes() {
	return {
		blackout: new BlackoutMode(),
		notification: new NotificationMode(),
		rainbow: new RainbowMode(),
		random: new RandomMode(),
		solid: new SolidColorMode(255, 0, 0),
		transition: new TransitionMode(),
	};
};
