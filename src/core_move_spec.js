import {List, Map} from 'immutable';
import {expect} from 'chai';

import {move} from '../src/core';



describe('core move function', () => {
	it('should move one unit North when facing North', () => {
		const state = Map({
			isPlaced: true,
			tableSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 1, y: 3}),
			facing: 'NORTH'
		})
		const nextState = move(state);
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
	it('should move one unit South when facing South', () => {
		const state = Map({
			isPlaced: true,
			tableSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 2, y: 3}),
			facing: 'SOUTH'
		})
		const nextState = move(state);
		expect(nextState).to.equal(Map({
			isPlaced: true,
			tableSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 2, y: 2}),
			facing: 'SOUTH'
		}));
	});
	it('should move one unit EAST when facing EAST', () => {
		const state = Map({
			isPlaced: true,
			tableSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 2, y: 3}),
			facing: 'EAST'
		})
		const nextState = move(state);
		expect(nextState).to.equal(Map({
			isPlaced: true,
			tableSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 3, y: 3}),
			facing: 'EAST'
		}));
	});
	it('should move one unit WEST when facing WEST', () => {
		const state = Map({
			isPlaced: true,
			tableSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 2, y: 3}),
			facing: 'WEST'
		})
		const nextState = move(state);
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
	it('should not move when facing WEST and x is 0 (end of table)', () => {
		const state = Map({
			isPlaced: true,
			tableSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 0, y: 3}),
			facing: 'WEST'
		})
		const nextState = move(state);
		expect(nextState).to.equal(Map({
			isPlaced: true,
			tableSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 0, y: 3}),
			facing: 'WEST'
		}));
	});
	it('should not move when facing EAST and x is 4 (end of table)', () => {
		const state = Map({
			isPlaced: true,
			tableSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 4, y: 3}),
			facing: 'EAST'
		})
		const nextState = move(state);
		expect(nextState).to.equal(Map({
			isPlaced: true,
			tableSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 4, y: 3}),
			facing: 'EAST'
		}));
	});
	it('should not move when facing NORTH and y is 4 (end of table)', () => {
		const state = Map({
			isPlaced: true,
			tableSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 4, y: 4}),
			facing: 'NORTH'
		})
		const nextState = move(state);
		expect(nextState).to.equal(Map({
			isPlaced: true,
			tableSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 4, y: 4}),
			facing: 'NORTH'
		}));
	});
	it('should not move when facing SOUTH and y is 0 (end of table)', () => {
		const state = Map({
			isPlaced: true,
			tableSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 4, y: 0}),
			facing: 'SOUTH'
		})
		const nextState = move(state);
		expect(nextState).to.equal(Map({
			isPlaced: true,
			tableSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 4, y: 0}),
			facing: 'SOUTH'
		}));
	});
	it('should not move if robot hasnt been placed', () => {
		const state = Map({
			tableSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 3, y: 3}),
			facing: 'SOUTH'
		});
		const nextState = move(state);
		expect(nextState).to.equal(state);
	});
});
