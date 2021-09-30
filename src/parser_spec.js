import {expect} from 'chai';
import {handleCommand} from '../src/parser';

describe('Parser', () => {

	it('it can handle LEFT COMMAND', () => {
		 expect(handleCommand('LEFT')).to.deep.equal([{type: 'ROTATE', direction: 'LEFT'}]);
	});
	it('it can handle RIGHT COMMAND', () => {
		expect(handleCommand('RIGHT')).to.deep.equal([{type: 'ROTATE', direction: 'RIGHT'}]);
	});
	it('it can handle REPORT COMMAND', () => {
		expect(handleCommand('REPORT')).to.deep.equal([{type: 'REPORT'}]);
	});
	it('it can handle MOVE COMMAND', () => {
		 expect(handleCommand('MOVE')).to.deep.equal([{type:'MOVE'}]);
	});

	it('it can handle PLACE COMMAND', () => {
		expect(handleCommand('PLACE 1,3,NORTH')).to.deep.equal([{
			type:'PLACE',
			position:{
				x:1, y:3, f:'NORTH'
			}
		}]);
	});
	// it('it can parse a text file to actions', () => {
	// 	expect(handleCommand('READ ./textfiles/example.txt')).to.deep.equal([
	// 		 	{
	// 			 	type:'PLACE',
	// 			 	position:{
	// 			 		x:1, y:2, f:'EAST'
	// 			 	}
	// 			},
	// 			{
	// 				type: 'MOVE'
	// 			},
	// 			{
	// 				type: 'MOVE'
	// 			},
	// 			{
	// 				type: 'ROTATE',
	// 				direction: 'LEFT'
	// 			},
	// 			{
	// 				type: 'MOVE'
	// 			},
	// 			{
	// 				type:'REPORT'
	// 			}
	// 		 ]);
	// });
	// it('it can parse a text file with newlines between commands', () => {
	// 	expect(handleCommand('READ ./textfiles/example1.txt')).to.deep.equal([
	// 		{
	// 			position: {
	// 				f: 'NORTH',
	// 				x: 0,
	// 				y: 0
	// 		},
	// 			type: 'PLACE'
	// 		},
	// 		{
	// 			direction: 'LEFT',
	// 			type: 'ROTATE'
	// 		},
	// 		{
	// 			type: 'REPORT'
	// 		}
	// 	])
	// });
	it('It doesnt read empty string', () => {
		expect(handleCommand('READ ').length).to.not.be.ok
	})
	it('It only reads text files', () => {
		expect(handleCommand('READ index.js ').length).to.not.be.ok
	})
	it('File not found is catched', () => {
		expect(handleCommand('READ index.txt ').length).to.not.be.ok
	})
	it('Doesnt respond to invalid commands from file', () => {
		expect(handleCommand('READ textfiles/invalidcommands.txt').length).to.not.be.ok
	})

	it('handles lower case commands', () => {
		expect(handleCommand('move')).to.deep.equal([{type:'MOVE'}]);
	});
	it('trims trailing spaces', () => {
		expect(handleCommand(' right ')).to.deep.equal([{type: 'ROTATE', direction: 'RIGHT'}]);
	});
	it('ignores other words', () => {
		expect(handleCommand('hello').length).to.not.be.ok;
	});
	it('ignores PLACE command with only two arguments', () => {
		expect(handleCommand('PLACE 1,3').length).to.not.be.ok;
	});


});