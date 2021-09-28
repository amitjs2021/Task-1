import makeStore from './src/store';
import { handleCommand } from './src/parser';
import 'colors';
const readline = require('readline')
	.createInterface({
		input: process.stdin,
		output: process.stdout
	});
const store = makeStore();



console.log('Welcome to toy robot.'.green.bold);
console.log('');
console.log('These are valid command:'.bold);
console.log('PLACE x,y,f'.bold.underline);
console.log('- Where x and y is coordinates and f (facing) must be either NORTH, SOUTH, WEST or EAST');
console.log('MOVE'.bold.underline);
console.log('- Will move the robot one unit in current direct');
console.log('LEFT'.bold.underline);
console.log('- Will rotate the robot 90 degrees to the left');
console.log('RIGHT'.bold.underline);
console.log('- Will rotate the robot 90 degrees to the right');
console.log('REPORT'.bold.underline);
console.log('- The robot will say the current position and facing direction');
console.log('READ commandtext/command1.txt'.bold.underline);
console.log('- You can use any textfile on your computer. The robot will execute all valid commands.');

function handleLineInput(input) {
	const action = handleCommand(input);
	//dispatching action
	action.forEach(store.dispatch);
	readline.prompt();
}

readline
	.on('line', handleLineInput)
	.on('close', () => {
		console.log('Thanks for playing');
		process.exit(0);
	})
	.setPrompt('Robot-Actions : > ');
readline.prompt();