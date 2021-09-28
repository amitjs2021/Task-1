import {place, rotate, move, report} from './action_creators.js';
import fs from 'fs';

/**
 * Handles singlecommand
 * @param  {string} command
 * @return {Array}
 */
function handleSingleCommand(command){
	if(command === 'LEFT' || command === 'RIGHT'){
		return [rotate(command)];
	}
	if(command === 'REPORT'){
		return [report()];
	}
	if(command === 'MOVE'){
		return [move()];
	}
	console.log('I dont know what that mean..');
	return [];
}
/**
 * Checks if filetype of path is Txt
 * Also gives error message is needed.
 * @param  {String}  path
 * @return {Boolean}
 */
function isFileTypeTxt(path){
	const fileType = path.substr(path.lastIndexOf('.')).toLowerCase();
	if(fileType !== '.txt'){
		console.log('I can only read .txt files');
		return false;
	}else{
		return true;
	}
}

/**
 * handleReadCommand checks that its a .txt file
 * If a file its found it splits the commands to an array.
 * @param  {String} path
 * @return {Array}
 */
function handleReadCommand(path){
	if(!isFileTypeTxt(path)){
		return [];
	}
	try{
		return fs.readFileSync(path, 'utf8').split('\n');
	}catch(err){
		if(err.code === 'ENOENT'){
			console.log('I\'m sorry, I cant find your file.');
		}else{
			console.log(err);
		}
		return [];
	}
}


/**
 * Returns action for PLACE command.
 * If action isnt PLACE or we have less than three arguments return null.
 * The validation of the arguments is handled by the reducer.
 *
 * @param  {String} command
 * @return {Array}
 */
function handleCommandWithArguments(command){
	const [actionType, actionArguments] = command.split(' '),
		  [x,y,f] = actionArguments.split(',');
	if(actionType === 'READ'){
		return handleReadCommand(actionArguments)
		.map(handleCommand)
		.reduce((acc, val)=> {
  			return acc.concat(val);
		}, []);

	}
	if(actionType !== 'PLACE' || actionArguments.split(',').length !== 3){
		console.log('Are you trying to PLACE me?');
		return [];
	}
	return [place({
		x: parseInt(x, 10),
		y: parseInt(y,10),
		f: f
	})];
}

/**
 * handleCommand
 * @param  {string} input
 * @return {Array}
 */
export function handleCommand(input){
	const command = input.toUpperCase().trim(),
		  actionWithArguments = command.split(' ').length > 1;
	if(actionWithArguments){
		return handleCommandWithArguments(command);
	}
	return handleSingleCommand(command);
}