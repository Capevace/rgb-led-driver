# ble-led-driver
A Node Bluetooth Low Energy RGB LED driver featuring many RGB color modes (rainbox, beat detection, fades etc.) using gatttool as a backend

> **Programmers Warning**: The BLE implementation in this driver is kinda whack if I'm honest. 
> I'm just piping a Node child process running `gatttool` and feeding it text commands to change colors.
> However the color effects and modes still work if you write your own wrapper class to support something like noble.
> The reason I'm doing is is _because I could't get any other solution to work_ ¯\_(ツ)_/¯

