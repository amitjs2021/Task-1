import {Map} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store';

describe('store', () => {

	it('is a Redux store configured with the correct reducer', () => {
		const store = makeStore();
		expect(store.getState()).to.equal(Map());
		store.dispatch({
			type: 'PLACE',
			position: {
				x: 1,
				y: 3,
				f: 'NORTH'
			}
		});
		expect(store.getState()).to.equal(Map({
			isPlaced: true,
			tableSize: Map({
				x: 5,
				y:5
			}),
			position: Map({x: 1, y: 3}),
			facing: 'NORTH'
		}));
	});

});