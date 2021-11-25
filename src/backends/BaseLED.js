class BaseLED {
	/**
	 * Called every tick if the color has changed.
	 * RGB values are 0-255.
	 * @abstract
	 * @param {number} red   
	 * @param {number} green 
	 * @param {number} blue  
	 */
	setRGB(r, g, b) {}

	/**
	 * Called when driver is shutdown.
	 * Use this for cleanup!
	 * @abstract
	 */
	destroy() {}
}

module.exports = { BaseLED };