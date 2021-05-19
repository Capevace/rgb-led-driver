const { spawn } = require('child_process');



// 	const readline = require('readline');
// 	readline.emitKeypressEvents(process.stdin);
// 	process.stdin.setRawMode(true);
// 	process.stdin.on('keypress', (str, key) => {
// 	  if (key.ctrl && key.name === 'c') {
// 	    process.exit();
// 	  } else if (key.name === 'c') {
// 	  	commands.connect();
// 	  } else if (key.name === 'd') {
// 	  	commands.disconnect();
// 	  	connected = false;
// 	  } else if (key.name === 'r') {
// 	  	fade = false;
// 	  	commands.sendRGB(255, 0, 0);
// 	  } else if (key.name === 'g') {
// 	  	fade = false;
// 	  	commands.sendRGB(0, 255, 0);
// 	  } else if (key.name === 'b') {
// 	  	fade = false;
// 	  	commands.sendRGB(0, 0, 255);
// 	  } else if (key.name === 'f') {
// 	  	fade = true;
// 	  }
// });

const { RGBLEDDriver } = require('./driver');



async function main() {
	const rgb = new RGBLEDDriver();
	await rgb.connect();

	// rgb.tick();
	// setInterval(() => rgb.tick(), 33);

	rgb
		.setMode('rainbow')
		.setSpeed(5);

	
}

main();