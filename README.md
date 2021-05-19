# ble-led-driver
A Node Bluetooth Low Energy RGB LED driver featuring many RGB color modes (rainbox, beat detection, fades etc.) using gatttool as a backend

> **Programmers Warning**: The BLE implementation in this driver is kinda whack if I'm honest. 
> I'm just piping a Node child process running [`gatttool`](https://elinux.org/RPi_Bluetooth_LE) and feeding it text commands to change colors.
> However it runs stable enough to use for home automation. 
> If you want to support a backend like [@abandonware/noble](https://github.com/abandonware/noble#readme), 
> the color effects and modes still work if you write your own wrapper class for it.
> The reason I'm doing it this way is simply _because I could't get any other solution to work_ ¯\\_(ツ)_/¯

