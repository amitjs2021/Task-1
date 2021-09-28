import {Map} from 'immutable';
import {validatePlaceValues} from './validation.js';

export const TABLE_SIZE = Map({
	x:5,
	y:5
});
export const INITIAL_STATE = Map();



/**
 * Takes the old state and new placeValues and return newState.
 * @param  {Immutable.Map} state
 * @param  {Object || Immutable.Map} placeValues
 * @return {Immutable.Map}
 */
export function place(state, placeValues) {
	const immbutablePlaceValues = Map(placeValues);
	const tableSize = state.get('tableSize', TABLE_SIZE);
	if(!validatePlaceValues(immbutablePlaceValues,tableSize)){
		return state;
	}
  return state
  	.set('isPlaced', true)
  	.set('tableSize', tableSize)
  	.set('position', Map({
  		x: immbutablePlaceValues.get('x'),
  		y: immbutablePlaceValues.get('y')
  	}))
  	.set('facing', immbutablePlaceValues.get('f'));
}

/**
 * Adds or decrease depending on the change parameter.
 * Using a currying pattern to remember how postion should change.
 * Also makes sure we dont fall down from the table.
 *
 * @param  {String} change
 * @return {Int}
 */
function makeCorrectMove(change,maximumValue){
	return position =>{
		if(change === 'increase' && position +1 !== maximumValue){
			return position + 1;
		}
		if(change === 'decrease' && position !== 0){
			return position - 1;
		}
		console.log('Are you trying to kill me?');
		return position;
	};
};

/**
 * Moves the robot one unit in the facing direction.
 * If the robot isnt placed old state is returned.
 *
 * @param  {Immutable.Map} state
 * @return {Immutable.Map}
 */
export function move(state) {
	if(!state.get('isPlaced')){
		console.log('I\'m not even on the table');
		return state;
	}
	switch (state.get('facing')) {
	case 'NORTH':
	  return state.updateIn(['position', 'y'], makeCorrectMove('increase', state.getIn(['tableSize', 'y'])));
	case 'SOUTH':
	  return state.updateIn(['position', 'y'], makeCorrectMove('decrease'));
	case 'EAST':
		return state.updateIn(['position', 'x'], makeCorrectMove('increase', state.getIn(['tableSize', 'x'])));
	case 'WEST':
		return state.updateIn(['position', 'x'], makeCorrectMove('decrease'));
	}
	return state;
}

/**
 * Rotate left.
 * @param  {String} facing
 * @return {String}
 */
function rotateLeft(facing){
	switch(facing){
		case 'NORTH':
			return 'WEST';
		case 'SOUTH':
			return 'EAST';
		case 'EAST':
			return 'NORTH';
		case 'WEST':
			return 'SOUTH';
	}
}

/**
 * Rotate right.
 * @param  {String} facing
 * @return {String}
 */
function rotateRight(facing){
	switch(facing){
		case 'NORTH':
			return 'EAST';
		case 'SOUTH':
			return 'WEST';
		case 'EAST':
			return 'SOUTH';
		case 'WEST':
			return 'NORTH';
	}
}

/**
 * Checks which direction to rotate and calls apropiate function.
 * I moved out the rotateRight | rotateLeft logic to keep the complexity low.
 *
 * @param  {String} direction
 * @return {String}
 */
function makeCorrectRotation(direction){
	return facing =>{
		if(direction === 'LEFT'){
			return rotateLeft(facing);
		}
		if(direction === 'RIGHT'){
			return rotateRight(facing);
		}
	};
}

/**
 * Rotates the robot with help of makeCorrectRotation.
 * If robot not been placed return old state.
 *
 * @param  {Immutable.Map} state
 * @param  {String} rotateDirection
 * @return {Immutable.Map}
 */
export function rotate(state, rotateDirection) {
		if(!state.get('isPlaced')){
			console.log('I\'m not even on the table');
			return state;
		}
		if(rotateDirection !== 'LEFT' && rotateDirection !== 'RIGHT'){
			return state;
		}
		return state.update('facing', makeCorrectRotation(rotateDirection));
}

/**
 * Reports current postions if robot have benn placed.
 * Also upddates the state to keep track of how many times we have reportet our position.
 * @param  {Immutable.Map} state
 * @return {Immutable.Map}
 */
export function report(state){
	if(!state.get('isPlaced')){
		return state;
	}
	console.log(`My X cordinate is ${state.getIn(['position', 'x'])} and my Y ${state.getIn(['position', 'y'])}. I'm facing ${state.get('facing')}`);
	return state.update('haveReportet', 0, timesReportet => timesReportet + 1);
}