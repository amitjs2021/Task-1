import {Map} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

	it('has an initial state', () => {
	  const action = {type: 'PLACE', position: {
	  	x: 1,
	  	y: 3,
	  	f: 'NORTH'
	  }};
	  const nextState = reducer(undefined, action);
	  expect(nextState).to.equal(Map({
	  	isPlaced: true,
	  	tableSize: Map({
	  		x: 5,
	  		y:5
	  	}),
	  	position: Map({x: 1, y: 3}),
	  	facing: 'NORTH'
	  }));
	});

	it('handles PLACE', () => {
		const initialState = Map();
		const action = {type: 'PLACE', position: {
			x: 1,
			y: 3,
			f: 'NORTH'
		}};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(Map({
			isPlaced: true,
			tableSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 1, y: 3}),
			facing: 'NORTH'
		}));
	});

	it('handles MOVE', () => {
		const initialState = Map({
			isPlaced: true,
			tableSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 1, y: 3}),
			facing: 'NORTH'
		});
		const action = {type: 'MOVE'};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(Map({
			isPlaced: true,
			tableSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 1, y: 4}),
			facing: 'NORTH'
		}));
	});

	it('handles ROTATE', () => {
		const initialState = Map({
			isPlaced: true,
			tableSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 1, y: 3}),
			facing: 'NORTH'
		});
		const action = {type: 'ROTATE', direction: 'LEFT'};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(Map({
			isPlaced: true,
			tableSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 1, y: 3}),
			facing: 'WEST'
		}));
	});
	it('handles REPORT', () => {
		const initialState = Map({
			isPlaced: true,
			tableSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 1, y: 3}),
			facing: 'NORTH'
		});
		const action = {type: 'REPORT'};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(Map({
			isPlaced: true,
			haveReportet: 1,
			tableSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 1, y: 3}),
			facing: 'NORTH'
		}));
	});

	it('can be used with reduce', () => {
	  const actions = [
	    {type: 'PLACE', position: {x:1, y:2, f:'EAST'}},
	    {type: 'MOVE'},
	    {type: 'MOVE'},
	    {type: 'ROTATE', direction: 'LEFT'},
	    {type: 'MOVE'},
	    {type: 'REPORT'}
	  ];
	  const finalState = actions.reduce(reducer, Map());
	  expect(finalState).to.equal(Map({
	 	  	isPlaced: true,
	 	  	haveReportet:1,
	 	  	tableSize: Map({
	 	  		x: 5,
	 	  		y:5
	 	  	}),
	 	  	position: Map({x: 3, y: 3}),
	 	  	facing: 'NORTH'
	 	  }));
	});

});