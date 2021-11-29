
# API Reference

## Table of contents
- [RGBLEDDriver](#rgbleddriver)
- [Modes](#modes)
	- [`SolidColorMode` _solid_](#solidcolormode-solid)
	- [`BlackoutMode` _blackout_](#blackoutmode-blackout)
	- [`NotificationMode` _notification_](#notificationmode-notification)
	- [`RainbowMode` _rainbow_](#rainbowmode-rainbow)
	- [`RandomMode` _random_](#randommode-random)
	- [`RGBMode` (abstract)](#rgbmode-abstract)
- [Backends](#backends)
	- [`GATTLED`](#gattled)
	- [`MockedLED`](#mockedled)
	- [`BaseLED` (abstract)](#baseled)

---

## RGBLEDDriver
LED driver class

**Kind**: inner class of [<code>rgb-led-driver</code>](#module_rgb-led-driver)  

* [~RGBLEDDriver](#RGBLEDDriver)
    * [new RGBLEDDriver(led, options)](#new_RGBLEDDriver_new)
    * [.currentMode](#RGBLEDDriver+currentMode) ⇒ [<code>RGBMode</code>](#RGBMode)
    * [.modes](#RGBLEDDriver+modes) ⇒ <code>object</code>
    * [.connectToBLE(mac)](#RGBLEDDriver+connectToBLE)
    * [.setLED(led)](#RGBLEDDriver+setLED)
    * [.setTickSpeed(ms)](#RGBLEDDriver+setTickSpeed)
    * [.setMode(mode, transitionDuration)](#RGBLEDDriver+setMode) ⇒ [<code>RGBMode</code>](#RGBMode)
    * [.setTransitionOverride(from, to, durationinMs)](#RGBLEDDriver+setTransitionOverride)
    * [.onTickError(fn)](#RGBLEDDriver+onTickError)
    * [.stop()](#RGBLEDDriver+stop)
    * [.sleep(ms)](#RGBLEDDriver+sleep) ⇒ <code>Promise</code>

<a name="new_RGBLEDDriver_new"></a>

### new RGBLEDDriver(led, options)
Create a new RGBLEDDriver


| Param | Type | Description |
| --- | --- | --- |
| led | [<code>BaseLED</code>](#BaseLED) \| <code>null</code> | The LED backend to use |
| options | <code>RGBLEDDriverOptions</code> | The options object |

<a name="RGBLEDDriver+currentMode"></a>

### rgb.currentMode ⇒ [<code>RGBMode</code>](#RGBMode)
Get the currently active RGBMode

**Kind**: instance property of [<code>RGBLEDDriver</code>](#RGBLEDDriver)  
<a name="RGBLEDDriver+modes"></a>

### rgb.modes ⇒ <code>object</code>
Get all available modes

**Kind**: instance property of [<code>RGBLEDDriver</code>](#RGBLEDDriver)  
<a name="RGBLEDDriver+connectToBLE"></a>

### rgb.connectToBLE(mac)
Shorthand to connect using GATTLED

**Kind**: instance method of [<code>RGBLEDDriver</code>](#RGBLEDDriver)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| mac | <code>String</code> | <code>72:16:03:00:D4:61</code> | MAC address |

<a name="RGBLEDDriver+setLED"></a>

### rgb.setLED(led)
Set the LED backend and (re-)start the tick loop

**Kind**: instance method of [<code>RGBLEDDriver</code>](#RGBLEDDriver)  

| Param | Type | Description |
| --- | --- | --- |
| led | [<code>BaseLED</code>](#BaseLED) | The LED backend |

<a name="RGBLEDDriver+setTickSpeed"></a>

### rgb.setTickSpeed(ms)
Set the tick speed and (re-)start the loop

**Kind**: instance method of [<code>RGBLEDDriver</code>](#RGBLEDDriver)  

| Param | Type | Description |
| --- | --- | --- |
| ms | <code>number</code> | Tick speed in ms |

<a name="RGBLEDDriver+setMode"></a>

### rgb.setMode(mode, transitionDuration) ⇒ [<code>RGBMode</code>](#RGBMode)
Set the active RGBMode

**Kind**: instance method of [<code>RGBLEDDriver</code>](#RGBLEDDriver)  
**Returns**: [<code>RGBMode</code>](#RGBMode) - - The active mode (for chaining)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| mode | [<code>RGBMode</code>](#RGBMode) |  | The new RGBMode |
| transitionDuration | <code>number</code> \| <code>null</code> | <code>700</code> | Duration of mode transition (0 to disable) |

<a name="RGBLEDDriver+setTransitionOverride"></a>

### rgb.setTransitionOverride(from, to, durationinMs)
Override the current mode with a transition

**Kind**: instance method of [<code>RGBLEDDriver</code>](#RGBLEDDriver)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| from | <code>Array</code> |  | From color array ([ r, g, b ]) |
| to | <code>Array</code> |  | To color array ([ r, g, b ]) |
| durationinMs | <code>Number</code> | <code>700</code> | The transition duration in ms |

<a name="RGBLEDDriver+onTickError"></a>

### rgb.onTickError(fn)
Set the error callback when one happens in a tick

**Kind**: instance method of [<code>RGBLEDDriver</code>](#RGBLEDDriver)  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="RGBLEDDriver+stop"></a>

### rgb.stop()
Stop the RGB driver and tick loop

**Kind**: instance method of [<code>RGBLEDDriver</code>](#RGBLEDDriver)  
<a name="RGBLEDDriver+sleep"></a>

### rgb.sleep(ms) ⇒ <code>Promise</code>
Helper method for better mode scripting.

Returns a Promise that resolves after `ms` milliseconds/

**Kind**: instance method of [<code>RGBLEDDriver</code>](#RGBLEDDriver)  

| Param | Type | Description |
| --- | --- | --- |
| ms | <code>number</code> | Delay in millseconds |



---

## Modes
- [`SolidColorMode` _solid_](#solidcolormode-solid)
- [`BlackoutMode` _blackout_](#blackoutmode-blackout)
- [`NotificationMode` _notification_](#notificationmode-notification)
- [`RainbowMode` _rainbow_](#rainbowmode-rainbow)
- [`RandomMode` _random_](#randommode-random)
- [`RGBMode` (abstract)](#rgbmode-abstract)

---

## [`SolidColorMode`](../src/modes/SolidColorMode.js) _solid_
Solid color mode simply displays a single color that can be changed from the outside.

This mode should be used if you want to show static colors≥

**Example:**
```js
const rgb = new RGBLEDDriver(...);
rgb.setMode('solid')
   .setColor(255, 0, 0, 'rgb'); // params are passed directly to chroma-js

rgb.currentMode
   .setHue(300); // change hue directly
```

**Kind**: inner class of [<code>rgb-led-driver</code>](#module_rgb-led-driver)  
**Since**: 1.0.0  

* [~SolidColorMode](#SolidColorMode)
    * [.color](#SolidColorMode+color) ⇒ <code>Array.&lt;number&gt;</code>
    * [.setColor(...chromaArguments)](#SolidColorMode+setColor) ⇒ [<code>SolidColorMode</code>](#SolidColorMode)
    * [.setHue(hue)](#SolidColorMode+setHue) ⇒ [<code>SolidColorMode</code>](#SolidColorMode)
    * [.setSaturation(saturation)](#SolidColorMode+setSaturation) ⇒ [<code>SolidColorMode</code>](#SolidColorMode)
    * [.setBrightness(brightness)](#SolidColorMode+setBrightness) ⇒ [<code>SolidColorMode</code>](#SolidColorMode)

<a name="SolidColorMode+color"></a>

### mode.color ⇒ <code>Array.&lt;number&gt;</code>
Get color as an RGB array ([ r, g, b ]).

**Kind**: instance property of [<code>SolidColorMode</code>](#SolidColorMode)  
**Read only**: true  
<a name="SolidColorMode+setColor"></a>

### mode.setColor(...chromaArguments) ⇒ [<code>SolidColorMode</code>](#SolidColorMode)
Set the color value.
You can pass colors in many ways in here.
Checkout [chroma-js docs](https://gka.github.io/chroma.js/) for more ways to set colors.

**Example:**
```js
rgb.setMode('solid')
   .setColor(255, 0, 0, 'rgb') // rgb
   .setColor('#00FF00') // hex
   .setColor(330, 1, 0.6, 'hsl'); // hsl
```

**Kind**: instance method of [<code>SolidColorMode</code>](#SolidColorMode)  
**Returns**: [<code>SolidColorMode</code>](#SolidColorMode) - Return `this` for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| ...chromaArguments | <code>Array.&lt;any&gt;</code> | Parameters directly passed to chroma. |

<a name="SolidColorMode+setHue"></a>

### mode.setHue(hue) ⇒ [<code>SolidColorMode</code>](#SolidColorMode)
Set a hue value directly (0-360)

**Example:**
```js
rgb.setMode('solid')
   .setHue(200);
```

**Kind**: instance method of [<code>SolidColorMode</code>](#SolidColorMode)  
**Returns**: [<code>SolidColorMode</code>](#SolidColorMode) - Return `this` for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| hue | <code>number</code> | The hue value |

<a name="SolidColorMode+setSaturation"></a>

### mode.setSaturation(saturation) ⇒ [<code>SolidColorMode</code>](#SolidColorMode)
Set color saturation

**Example:**
```js
rgb.setMode('solid')
   .setHue(200)
   .setSaturation(0.7);
```

**Kind**: instance method of [<code>SolidColorMode</code>](#SolidColorMode)  
**Returns**: [<code>SolidColorMode</code>](#SolidColorMode) - Return `this` for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| saturation | <code>number</code> | Saturation (0.0...1.0) |

<a name="SolidColorMode+setBrightness"></a>

### mode.setBrightness(brightness) ⇒ [<code>SolidColorMode</code>](#SolidColorMode)
Set color brightness

**Example:**
```js
rgb.setMode('solid')
   .setHue(200)
   .setBrightness(0.2);
```

**Kind**: instance method of [<code>SolidColorMode</code>](#SolidColorMode)  
**Returns**: [<code>SolidColorMode</code>](#SolidColorMode) - Return `this` for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| brightness | <code>number</code> | Brightness (0.0...1.0) |



---

## [`BlackoutMode`](../src/modes/BlackoutMode.js) _blackout_
Blackout mode just displays black. 

This is very useful for implementing on/off controls.

**Example:**
```js
const app = express();
const rgb = new RGBLEDDriver(...);
	
// Set mode to blackout to turn the device "off"
app.post('/off', () => rgb.setMode('blackout'));

// Solid mode will remember the previous color
app.post('/on', () => rgb.setMode('solid'));
```

**Kind**: inner class of [<code>rgb-led-driver</code>](#module_rgb-led-driver)  
**Since**: 1.0.0  


---

## [`NotificationMode`](../src/modes/NotificationMode.js) _notification_
Notification mode will flash a color to signify a notification.

**Example:**
```js
const rgb = new RGBLEDDriver(...);
io.on('connection', socket => {
	socket.on('notification', () => {
		const oldMode = rgb.currentMode.type;
			
		rgb.setMode('notification', 250)
		   .setDuration(1000);

		// After transition (250) + animation duration (1000) = 1250ms
		// we return to the previous mode
		setTimeout(() => {
			rgb.setMode(oldMode);
		}, 1250);
	})
});
```

**Kind**: inner class of [<code>rgb-led-driver</code>](#module_rgb-led-driver)  
**Since**: 1.0.0  

* [~NotificationMode](#NotificationMode)
    * [.tint](#NotificationMode+tint) : <code>module:chroma-js~color</code>
    * [.progress](#NotificationMode+progress) : <code>Number</code>
    * [.duration](#NotificationMode+duration) : <code>Number</code>
    * [.curve](#NotificationMode+curve) : <code>Float32Array</code>
    * [.setProgress(progress)](#NotificationMode+setProgress) ⇒ [<code>NotificationMode</code>](#NotificationMode)
    * [.setDuration(duration)](#NotificationMode+setDuration) ⇒ [<code>NotificationMode</code>](#NotificationMode)
    * [.setTint(chromaArguments)](#NotificationMode+setTint) ⇒ [<code>NotificationMode</code>](#NotificationMode)

<a name="NotificationMode+tint"></a>

### mode.tint : <code>module:chroma-js~color</code>
The notification tint color.
It is recommended to use [setTint](#NotificationMode+setTint) instead.

**Example:**
```js
rgb.currentMode.tint = chroma('#fff');
```

**Kind**: instance property of [<code>NotificationMode</code>](#NotificationMode)  
**See**: {NotificationMode#setTint}  
<a name="NotificationMode+progress"></a>

### mode.progress : <code>Number</code>
The progress index used to iterate through the animation curve.

**Kind**: instance property of [<code>NotificationMode</code>](#NotificationMode)  
**Default**: <code>0</code>  
**See**: {NotificationMode#setProgress}  
<a name="NotificationMode+duration"></a>

### mode.duration : <code>Number</code>
The animation duration in ms.

**Kind**: instance property of [<code>NotificationMode</code>](#NotificationMode)  
**Default**: <code>1000</code>  
**See**: {NotificationMode#setDuration}  
<a name="NotificationMode+curve"></a>

### mode.curve : <code>Float32Array</code>
The brightness curve used for the color animation.

**Kind**: instance property of [<code>NotificationMode</code>](#NotificationMode)  
<a name="NotificationMode+setProgress"></a>

### mode.setProgress(progress) ⇒ [<code>NotificationMode</code>](#NotificationMode)
Helper method to set the progress index of the animation.
This index should not exceed the brightness curve.

**Kind**: instance method of [<code>NotificationMode</code>](#NotificationMode)  
**Returns**: [<code>NotificationMode</code>](#NotificationMode) - Return `this` for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| progress | <code>number</code> | The progress index. |

<a name="NotificationMode+setDuration"></a>

### mode.setDuration(duration) ⇒ [<code>NotificationMode</code>](#NotificationMode)
Set duration in milliseconds

**Kind**: instance method of [<code>NotificationMode</code>](#NotificationMode)  
**Returns**: [<code>NotificationMode</code>](#NotificationMode) - Return `this` for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| duration | <code>number</code> | Duration in ms |

<a name="NotificationMode+setTint"></a>

### mode.setTint(chromaArguments) ⇒ [<code>NotificationMode</code>](#NotificationMode)
Set the tint of the notification animation.
Checkout [chroma-js docs](https://gka.github.io/chroma.js/) for more ways to set colors.

**Example:**
```js
rgb.setMode('notification')
   .setTint(255, 0, 0, 'rgb') // rgb
   .setTint('#00FF00') // hex
   .setTint(330, 1, 0.6, 'hsl'); // hsl
```

**Kind**: instance method of [<code>NotificationMode</code>](#NotificationMode)  
**Returns**: [<code>NotificationMode</code>](#NotificationMode) - Return `this` for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| chromaArguments | <code>Array.&lt;any&gt;</code> | Parameters directly passed to chroma. |



---

## [`RainbowMode`](../src/modes/RainbowMode.js) _rainbow_
Rainbow mode rotates the hue repeatedly, creating a rainbow effect.

**Example:**
```js
const rgb = new RGBLEDDriver(...);
rgb.setMode('rainbow')
   .setSpeed(2); // 2 hue rotations (720deg) per second
```

**Kind**: inner class of [<code>rgb-led-driver</code>](#module_rgb-led-driver)  
**Since**: 1.0.0  

* [~RainbowMode](#RainbowMode)
    * [.hue](#RainbowMode+hue) : <code>Number</code>
    * [.speed](#RainbowMode+speed) : <code>Number</code>
    * [.setHue(hue)](#RainbowMode+setHue) ⇒ [<code>RainbowMode</code>](#RainbowMode)
    * [.setSpeed(speed)](#RainbowMode+setSpeed) ⇒ [<code>RainbowMode</code>](#RainbowMode)

<a name="RainbowMode+hue"></a>

### mode.hue : <code>Number</code>
Current rainbow hue value (0-360).

**Kind**: instance property of [<code>RainbowMode</code>](#RainbowMode)  
<a name="RainbowMode+speed"></a>

### mode.speed : <code>Number</code>
Number of hue rotations per second

**Kind**: instance property of [<code>RainbowMode</code>](#RainbowMode)  
**Default**: <code>1</code>  
<a name="RainbowMode+setHue"></a>

### mode.setHue(hue) ⇒ [<code>RainbowMode</code>](#RainbowMode)
Set the rainbow hue value directly (0-360)

**Example:**
```js
rgb.setMode('rainbow')
   .setHue(200);
```

**Kind**: instance method of [<code>RainbowMode</code>](#RainbowMode)  
**Returns**: [<code>RainbowMode</code>](#RainbowMode) - Return `this` for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| hue | <code>number</code> | The hue value |

<a name="RainbowMode+setSpeed"></a>

### mode.setSpeed(speed) ⇒ [<code>RainbowMode</code>](#RainbowMode)
Set speed in hue rotations per second

**Example:**
```js
rgb.setMode('rainbow')
   .setSpeed(2); // num of hue rotations per second
```

**Kind**: instance method of [<code>RainbowMode</code>](#RainbowMode)  
**Returns**: [<code>RainbowMode</code>](#RainbowMode) - Return `this` for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| speed | <code>number</code> | Num of hue rotations per second |



---

## [`RandomMode`](../src/modes/RandomMode.js) _random_
Random mode sets a random color in specified intervals.

**Example:**
```js
const rgb = new RGBLEDDriver(...);
rgb.setMode('random')
   .setSpeed(2); // num of colors per second
```

**Kind**: inner class of [<code>rgb-led-driver</code>](#module_rgb-led-driver)  
**Since**: 1.0.0  

* [~RandomMode](#RandomMode)
    * [.counter](#RandomMode+counter) : <code>Number</code>
    * [.speed](#RandomMode+speed) : <code>Number</code>
    * [.setSpeed(speed)](#RandomMode+setSpeed)

<a name="RandomMode+counter"></a>

### mode.counter : <code>Number</code>
Counter for random interval.

**Kind**: instance property of [<code>RandomMode</code>](#RandomMode)  
**Default**: <code>0.0</code>  
<a name="RandomMode+speed"></a>

### mode.speed : <code>Number</code>
Time interval for color changes in ms.

**Kind**: instance property of [<code>RandomMode</code>](#RandomMode)  
**Default**: <code>1000.0</code>  
<a name="RandomMode+setSpeed"></a>

### mode.setSpeed(speed)
Set speed in per seconds

**Kind**: instance method of [<code>RandomMode</code>](#RandomMode)  

| Param | Type | Description |
| --- | --- | --- |
| speed | <code>number</code> | Num of colors per second (1 = 1 per second) |



---

## [`RGBMode`](../src/modes/RGBMode.js) (abstract)
RGBMode is the abstract class that all other RGB modes extend.

**Example:**
```js
const { RGBMode } = require('rgb-led-driver');

class MyCustomMode extends RGBMode {
	constructor() {
		super();
		this.type = 'my-custom-mode';
		this.color = this.chroma('red').rgb();
		this.counter = 0.0;
		this.speed = 1000.0;
	}
	
	setSpeed(speed) {
		this.speed = speed * 1000;
		return this;
	}
	
	tick(delta) {
		this.counter += this.speed * (delta / 1000);
		if (this.counter >= 1000) {
			this.counter = 0.0;
			this.color = this.chroma.random().rgb();
		}
	}
}
```

**Kind**: inner abstract class of [<code>rgb-led-driver</code>](#module_rgb-led-driver)  
**See**: examples/custom-led-mode.js  
**Since**: 1.0.0  

* *[~RGBMode](#RGBMode)*
    * *[new RGBMode()](#new_RGBMode_new)*
    * *[.color](#RGBMode+color) : <code>Array.&lt;number&gt;</code>*
    * *[.type](#RGBMode+type) : <code>String</code>*
    * *[.chroma](#RGBMode+chroma) : <code>ChromaJS</code>*
    * *[.tick(delta)](#RGBMode+tick)*

<a name="new_RGBMode_new"></a>

### *new RGBMode()*
Initialize the color mode.

<a name="RGBMode+color"></a>

### *mode.color : <code>Array.&lt;number&gt;</code>*
The color to be used. (Type: [ r, g, b ])

This value will be read and used _after_ every tick.

**Kind**: instance property of [<code>RGBMode</code>](#RGBMode)  
**Default**: <code>[0, 0, 0]</code>  
<a name="RGBMode+type"></a>

### *mode.type : <code>String</code>*
Mode identifier

**Kind**: instance property of [<code>RGBMode</code>](#RGBMode)  
<a name="RGBMode+chroma"></a>

### *mode.chroma : <code>ChromaJS</code>*
A `chroma-js` instance for easier color manipulation.

**Kind**: instance property of [<code>RGBMode</code>](#RGBMode)  
<a name="RGBMode+tick"></a>

### *mode.tick(delta)*
Tick function, called by default ~30 times per second.

The delta time since the last frame is passed in milliseconds.

**Kind**: instance method of [<code>RGBMode</code>](#RGBMode)  

| Param | Type | Description |
| --- | --- | --- |
| delta | <code>number</code> | Time since last tick in ms |



---

## Backends
- [`GATTLED`](#gattled)
- [`MockedLED`](#mockedled)
- [`BaseLED` (abstract)](#baseled)

---

## GATTLED
GATTLED will connect to Bluetooth Low Energy based devices via `gatttool`.

Note: You will probably need to install `gatttool` in order for this to work.

**Kind**: inner class of [<code>rgb-led-driver</code>](#module_rgb-led-driver)  

* [~GATTLED](#GATTLED)
    * [new GATTLED(mac, debugOutput)](#new_GATTLED_new)
    * [.setRGB(red, green, blue)](#GATTLED+setRGB)
    * [.destroy()](#GATTLED+destroy)

<a name="new_GATTLED_new"></a>

### new GATTLED(mac, debugOutput)
Create a new GATTLED instance.

If debug mode is enabled, `gatttool` will not actually be called.
This is useful for development on machines, where gatttool isn't/can't be installed.


| Param | Type | Description |
| --- | --- | --- |
| mac | <code>string</code> | MAC address to connect to |
| debugOutput | <code>Boolean</code> | Function to output debug logs |

**Example**  
```js
const { RGBLEDDriver, GATTLED } = require('rgb-led-driver');

	const rgb = new RGBLEDDriver();
	const led = new GATTLED(
		'<MAC ADDRESS of BLE device>',
		(msg) => console.log('Debug Log', msg)
	);

	rgb.setLED(led);
```
<a name="GATTLED+setRGB"></a>

### led.setRGB(red, green, blue)
Called every tick if the color has changed.
RGB values are 0-255.

**Kind**: instance method of [<code>GATTLED</code>](#GATTLED)  

| Param | Type |
| --- | --- |
| red | <code>number</code> | 
| green | <code>number</code> | 
| blue | <code>number</code> | 

<a name="GATTLED+destroy"></a>

### led.destroy()
Called when driver is shutdown.
Use this for cleanup!

**Kind**: instance method of [<code>GATTLED</code>](#GATTLED)  


---

## MockedLED
MockedLED will render a color block and driver info in your terminal window.

Great for creating and debugging color modes.

**Kind**: inner class of [<code>rgb-led-driver</code>](#module_rgb-led-driver)  
**Extends**: [<code>BaseLED</code>](#BaseLED)  

* [~MockedLED](#MockedLED) ⇐ [<code>BaseLED</code>](#BaseLED)
    * *[.setRGB(red, green, blue)](#MockedLED+setRGB)*
    * *[.destroy()](#MockedLED+destroy)*

<a name="MockedLED+setRGB"></a>

### *led.setRGB(red, green, blue)*
Called every tick if the color has changed.
RGB values are 0-255.

**Kind**: instance abstract method of [<code>MockedLED</code>](#MockedLED)  
**Overrides**: [<code>setRGB</code>](#BaseLED+setRGB)  

| Param | Type |
| --- | --- |
| red | <code>number</code> | 
| green | <code>number</code> | 
| blue | <code>number</code> | 

<a name="MockedLED+destroy"></a>

### *led.destroy()*
Called when driver is shutdown.
Use this for cleanup!

**Kind**: instance abstract method of [<code>MockedLED</code>](#MockedLED)  
**Overrides**: [<code>destroy</code>](#BaseLED+destroy)  


---

## BaseLED (abstract)
BaseLED is the abstract class that you should extend if you want to create a custom LED backend.


* *[BaseLED](#BaseLED)*
    * **[.setRGB(red, green, blue)](#BaseLED+setRGB)**
    * **[.destroy()](#BaseLED+destroy)**

<a name="BaseLED+setRGB"></a>

### **led.setRGB(red, green, blue)**
Called every tick if the color has changed.
RGB values are 0-255.

**Kind**: instance abstract method of [<code>BaseLED</code>](#BaseLED)  

| Param | Type |
| --- | --- |
| red | <code>number</code> | 
| green | <code>number</code> | 
| blue | <code>number</code> | 

<a name="BaseLED+destroy"></a>

### **led.destroy()**
Called when driver is shutdown.
Use this for cleanup!

**Kind**: instance abstract method of [<code>BaseLED</code>](#BaseLED)  
