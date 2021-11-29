
# API Reference

## Table of contents
- [RGBLEDDriver](#rgbleddriver)
- [Modes](#modes)
	-
- [Backends](#backends)
	- [GATTLED](#gattled)
	- [MockedLED](#mockedled)
	- [BaseLED (abstract)](#baseled)

## RGBLEDDriver
LED driver class

**Kind**: inner class of [<code>rgb-led-driver</code>](#module_rgb-led-driver)  

* [~RGBLEDDriver](#RGBLEDDriver)
    * [new RGBLEDDriver(led, options)](#new_RGBLEDDriver_new)
    * [.currentMode](#RGBLEDDriver+currentMode) ⇒ <code>RGBMode</code>
    * [.modes](#RGBLEDDriver+modes) ⇒ <code>object</code>
    * [.connectToBLE(mac)](#RGBLEDDriver+connectToBLE)
    * [.setLED(led)](#RGBLEDDriver+setLED)
    * [.setTickSpeed(ms)](#RGBLEDDriver+setTickSpeed)
    * [.setMode(mode, transitionDuration)](#RGBLEDDriver+setMode) ⇒ <code>RGBMode</code>
    * [.setTransitionOverride(from, to, durationinMs)](#RGBLEDDriver+setTransitionOverride)
    * [.onTickError(fn)](#RGBLEDDriver+onTickError)
    * [.stop()](#RGBLEDDriver+stop)

<a name="new_RGBLEDDriver_new"></a>

### new RGBLEDDriver(led, options)
Create a new RGBLEDDriver


| Param | Type | Description |
| --- | --- | --- |
| led | [<code>BaseLED</code>](#BaseLED) \| <code>null</code> | The LED backend to use |
| options | <code>RGBLEDDriverOptions</code> | The options object |

<a name="RGBLEDDriver+currentMode"></a>

### rgb.currentMode ⇒ <code>RGBMode</code>
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

### rgb.setMode(mode, transitionDuration) ⇒ <code>RGBMode</code>
Set the active RGBMode

**Kind**: instance method of [<code>RGBLEDDriver</code>](#RGBLEDDriver)  
**Returns**: <code>RGBMode</code> - - The active mode (for chaining)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| mode | <code>RGBMode</code> |  | The new RGBMode |
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
Stop the RGB driver

**Kind**: instance method of [<code>RGBLEDDriver</code>](#RGBLEDDriver)  


## Modes

## Backends
### GATTLED
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


### MockedLED
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


### BaseLED
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
