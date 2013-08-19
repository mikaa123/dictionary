/* global describe: false, it: false, before: false */

var assert = require('assert'),
	Dictionary,
	dictionary,
	data;

global.Backbone = require('backbone');
global._ = require('underscore');

Dictionary = require('../../models/dictionary');

var dictionary = new Dictionary(),
	data = [
		'"SOMEKEY"',
		'"SOME_OTHER_KEY"',
		'"SOMEKEY"',
		'"SOME_MORE_KEY"'
	];

function arrayEqual(keys, expected) {
	return function() {
		var dataArray = data.slice(0);
		var newArr = dictionary.removeKeysFromArray(dataArray, keys);
		assert.deepEqual(newArr, expected);
	};
}

describe('Dictionary', function() {
	before(function() {

	}),
	describe('#removeKeysFromArray', function() {
		it('removes one key', arrayEqual(['SOME_OTHER_KEY'],
			[
				'"SOMEKEY"',
				'"SOMEKEY"',
				'"SOME_MORE_KEY"'
			]
		));
		it('removes several keys', arrayEqual(['SOME_OTHER_KEY', 'SOME_MORE_KEY'],
			[
				'"SOMEKEY"',
				'"SOMEKEY"'
			]
		));
		it('removes duplicate keys', arrayEqual(['SOMEKEY'],
			[
				'"SOME_OTHER_KEY"',
				'"SOME_MORE_KEY"'
			]
		));
		it('does not do anything when no keys are found', arrayEqual(['UNDEFINED_KEY'],
			data
		));
		it('does not do anything when no keys are passed', arrayEqual([],
			data
		));
	});
});