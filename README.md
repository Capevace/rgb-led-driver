# ble-led-driver
A Node Bluetooth Low Energy RGB LED driver featuring many RGB color modes (rainbox, beat detection, fades etc.) using gatttool as a backend

> **Programmers Warning**: The BLE implementation in this driver is kinda whack if I'm honest. 
> I'm just piping a Node child process running [`gatttool`](https://elinux.org/RPi_Bluetooth_LE) and feeding it text commands to change colors.
> However it runs stable enough to use for home automation. 
> If you want to support a backend like [@abandonware/noble](https://github.com/abandonware/noble#readme), 
> the color effects and modes still work if you write your own wrapper class for it.
> The reason I'm doing it this way is simply _because I could't get any other solution to work_ ¯\\\_(ツ)\_/¯

- [Usage](#usage)
    - [Installation](#installation)
    - [Creating a driver and connecting to LED controller](#creating-a-driver-and-connecting-to-led-controller)
    - [Controlling the LEDs](#controlling-the-leds)
    - [Transitions](#transitions)
- [Modes](#modes)
- [Custom Bluetooth backend](#custom-bluetooth-backend)
- [Changelog](#changelog)

## Usage
### Installation
```shell
npm i ble-led-driver
```

### Creating a driver and connecting to LED controller
```js
const { RGBLEDDriver } = require('ble-led-driver');

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
```

### Controlling the LEDs
```js
// Set a mode (e.g. rainbow, random, solid)
rgb.setMode('rainbow');

// Set mode to solid color
rgb.setMode('solid');

// Change color of solid mode
// Function arguments for setColor are directly passed to chroma-js to create a color,
// so see https://gka.github.io/chroma.js for more info on this.
rgb.currentMode.setColor(r, g, b, 'rgb');

// setMode returns the new mode so this can be chained
rgb.setMode('rainbow')
   .setSpeed(1.5); // speed is hue rotations per second
````

### Transitions
We can transition between colors by setting a "transition override". This will generate an array of colors between a "from" and "to" color.

The tick method will then stop being called until the colors in this array have all been shown. A duration for this fade can be passed as well (in ms).

```js
// Get the old color, this is the "from"
const previousColor = rgb.currentMode.color;

// Set the mode before transitioning
rgb.setMode('solid')
   .setColor(0, 0, 255, 'rgb');

// The new color is to "to"
const newColor = rgb.currentMode.color;

// Transition from previous to new in 700ms
rgb.setTransitionOverride(previousColor, newColor, 700);
```

## Modes
- [BlackoutMode](src/modes/BlackoutMode.js)
- [NotificationMode](src/modes/NotificationMode.js)
- [RainbowMode](src/modes/RainbowMode.js)
- [RandomMode](src/modes/RandomMode.js)
- [SolidColorMode](src/modes/SolidColorMode.js)

All these modes subclass [RGBMode](src/modes/RGBMode.js) which you can use, to implement custom modes.

For more info on what modes there are and how to use them, have a look at [src/modes/index.js](src/modes/index.js).

## Custom backend
Currently a `gatttool` process is started in the background and colors are simply piped into it.
This is rather inefficient but works for my use-case.

_Technically, your backend doesn't need to have to do anything in regards to Bluetooth. 
You could also use the mode system from RGBLEDDriver and then pipe them into some other socket or whatever you may come up with!_

You can create custom LED backends by implementing the following methods:
```js
const customLED = {
    /**
     * Connect (called when driver has been initialized)
     */
    connect() {},

    /**
     * Disconnect (called on shutdown etc.)
     */
    disconnect() {},

    /**
     * If LED is connected
     * @return {Boolean}
     */
    isConnected() {
        return false || true;
    },

    /**
     * Called every tick if the color has changed.
     * RGB values are 0-255.
     * @param {number} red   
     * @param {number} green 
     * @param {number} blue  
     */
    setRGB(red, green, blue) {
        // Set your led color values
    }
};
```

Your custom LED driver can then be used like this:
```js
/*
 * Normally you would call 
 *     await rgb.connect(mac);
 * Instead you now call:
 */
rgb.setCustomLED(customLED);
```

## Changelog
### 0.0.13
- Changed tick error handling to allow custom handler using `rgb.onTickError()`