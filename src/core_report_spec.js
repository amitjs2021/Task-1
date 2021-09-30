import {List, Map} from 'immutable';
import {expect} from 'chai';

import {report} from '../src/core';


describe('core report function', () => {
	it('should report is current postion and which way its facing', () => {
			const state = Map({
				isPlaced: true,
				position: Map({x: 4, y: 3}),
				facing: 'NORTH'
			})
			const nextState = report(state);
			expect(nextState).to.equal(Map({
				isPlaced: true,
				haveReportet: 1,
				position: Map({x: 4, y: 3}),
				facing: 'NORTH'
			}));
	});
	it('should have correct haveReportet count', () => {
			const state = Map({
				isPlaced: true,
				haveReportet: 2,
				position: Map({x: 1, y: 3}),
				facing: 'NORTH'
			})
			const nextState = report(state);
			expect(nextState).to.equal(Map({
				isPlaced: true,
				haveReportet: 3,
				position: Map({x: 1, y: 3}),
				facing: 'NORTH'
			}));
	});
	it('should not report is current postion if it hasnt been placed', () => {
			const state = Map({
				position: Map({x: 1, y: 3}),
				facing: 'NORTH'
			})
			const nextState = report(state);
			expect(nextState).to.equal(state);


	});
});