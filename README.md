# ble-led-driver
A Node Bluetooth Low Energy RGB LED driver featuring many RGB color modes (rainbox, beat detection, fades etc.) using gatttool as a backend

> **Programmers Warning**: The BLE implementation in this driver is kinda whack if I'm honest. 
> I'm just piping a Node child process running [`gatttool`](https://elinux.org/RPi_Bluetooth_LE) and feeding it text commands to change colors.
> However it runs stable enough to use for home automation. 
> If you want to support a backend like [@abandonware/noble](https://github.com/abandonware/noble#readme), 
> the color effects and modes still work if you write your own wrapper class for it.
> The reason I'm doing it this way is simply _because I could't get any other solution to work_ ¯\\\_(ツ)\_/¯

## Usage
Install with npm:
```shell
npm i ble-led-driver
```

```js
// The BLE MAC address of your device
const macAddress = '72:16:03:00:D4:61';

// These options are optional but can be passed to RGBLEDDriver
const options = {
	tickSpeed: 33, // in ms, default is 33ms for ~30fps
	tickErrorHandler: () => {...}, // this callback is invoked when gatttool is returning errors
	modes: [...], // list of available LED modes, see src/modes to see how they work
};


// Create a new driver instance
let rgb = new RGBLEDDriver(options);

// Another way to set the tickErrorHandler
rgb.onTickError((e) => console.error('TICK:ERROR', e));

// Connect to the BLE LED controller
try {
	await rgb.connect(macAddress);
} catch (e) {
	// Error during connection
	console.error(e);
}

// The driver is now ready and can be used

// Set a mode (e.g. rainbow, random, solid)
rgb.setMode('rainbow');

// Set mode to solid color
rgb.setMode('solid');

// Change color
// Function arguments are directly passed to chroma-js to create a color,
// so see https://gka.github.io/chroma.js for more info on this.
rgb.currentMode.setColor(r, g, b, 'rgb');

// setMode returns the new mode so this can be chained
rgb.setMode('rainbow')
   .setSpeed(1.5); // speed is hue rotations per second
```

For more info on what modes there are and how to use them, have a look at [src/modes/index.js](src/modes/index.js).


## Changelog
### 0.0.13
- Changed tick error handling to allow custom handler using `rgb.onTickError()`