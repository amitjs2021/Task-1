import {Map} from 'immutable';

/**
 * Checks if number is and Integer
 * @param  {int}  number
 * @return {Boolean}
 */
function isNotAnInteger(number){
	if(typeof number ==='number' && (number%1) === 0){
		return false;
	}
	console.log('I didn\'t understand that coordinate.');
	return true;
}

function isCoordinateBiggerThanTableSize(placeValues, tableSize){
	if(placeValues.get('x') > tableSize.get('x') ||
	   placeValues.get('y') > tableSize.get('y')){
		console.log('That\'s not on the table.');
		return true;
	}
	return false;
}

function isNegativeNumber(placeValues){
	if(placeValues.get('y') < 0 || placeValues.get('x') < 0){
		console.log('That\'s not on the table.');
		return true;
	}
	return false;
}

/**
 * Valdates position, make sure X and Y is an Integer
 * And that is inside of our table.
 * @private
 * @param  {Immutable.Map} placeValues
 * @return {Boolean}
 */
function validatePosition(placeValues, tableSize){
	if(isNotAnInteger(placeValues.get('y')) ||
	   isNotAnInteger(placeValues.get('x')) ||
	   isNegativeNumber(placeValues)		||
	   isCoordinateBiggerThanTableSize(placeValues, tableSize)){
		return false;
	}
	return true;
}

/**
 * Checks that facing is valid string.
 * @param  {Immutable.Map} placeValues
 * @return {Boolean}
 */
function validateFacing(placeValues){
	const validFacingValue = Map({
		NORTH: true,
		SOUTH: true,
		EAST: true,
		WEST: true
	});
	if(validFacingValue.has(placeValues.get('f'))){
		return true;
	}else{
		console.log('NORTH, EAST, SOUTH or WEST please.');
	}
}

/**
 * Validate placeValues with the help of private validation functions.
 * @param  {Immutable.Map} placeValues
 * @return {Boolean}
 */
export function validatePlaceValues(placeValues, tableSize){
	if(!validateFacing(placeValues)){
		return false;
	}
	if(!validatePosition(placeValues,tableSize)){
		return false;
	}
	return true;
}