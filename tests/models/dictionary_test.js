/* global describe: false, it: false, before: false */

var assert = require('assert'),
	Dictionary,
	dictionary,
	data;

global.Backbone = require('backbone');
global._ = require('underscore');

Dictionary = require('../../models/dictionary');

var dictionary = new Dictionary(),
	dataXml = [
		'"SOMEKEY"',
		'"SOME_OTHER_KEY"',
		'"SOMEKEY"',
		'"SOME_MORE_KEY"'
	],
	dataProperties = [
		'SOMEKEY=ghjghj',
		'SOME_OTHER_KEY=gfd',
		'SOMEKEY=',
		'SOME_MORE_KEY=sdfsd'
	];

function arrayEqualXml(keys, expected) {
	return function() {
		var dataArray = dataXml.slice(0);
		var newArr = dictionary.removeKeysFromArray(dataArray, keys);
		assert.deepEqual(newArr, expected);
	};
}

function arrayEqualProperties(keys, expected) {
	return function() {
		var dataArray = dataProperties.slice(0);
		var newArr = dictionary.removeKeysFromArray(dataArray, keys);
		assert.deepEqual(newArr, expected);
	};
}

describe('Dictionary', function() {
	before(function() {

	}),
	describe('#removeKeysFromArray for xml file', function() {
		before(function() {
			dictionary.set('type', 'xml');
		});
		it('removes one key', arrayEqualXml(['SOME_OTHER_KEY'],
			[
				'"SOMEKEY"',
				'"SOMEKEY"',
				'"SOME_MORE_KEY"'
			]
		));
		it('removes several keys', arrayEqualXml(['SOME_OTHER_KEY', 'SOME_MORE_KEY'],
			[
				'"SOMEKEY"',
				'"SOMEKEY"'
			]
		));
		it('removes duplicate keys', arrayEqualXml(['SOMEKEY'],
			[
				'"SOME_OTHER_KEY"',
				'"SOME_MORE_KEY"'
			]
		));
		it('does not do anything when no keys are found', arrayEqualXml(['UNDEFINED_KEY'],
			dataXml
		));
		it('does not do anything when no keys are passed', arrayEqualXml([],
			dataXml
		));
	});
	describe('#removeKeysFromArray for properties file', function() {
		before(function() {
			dictionary.set('type', 'properties');
		});
		it('removes one key', arrayEqualProperties(['SOME_OTHER_KEY'],
			[
				'SOMEKEY=ghjghj',
				'SOMEKEY=',
				'SOME_MORE_KEY=sdfsd'
			]
		));
		it('removes several keys', arrayEqualProperties(['SOME_OTHER_KEY', 'SOME_MORE_KEY'],
			[
				'SOMEKEY=ghjghj',
				'SOMEKEY='
			]
		));
		it('removes duplicate keys', arrayEqualProperties(['SOMEKEY'],
			[
				'SOME_OTHER_KEY=gfd',
				'SOME_MORE_KEY=sdfsd'
			]
		));
		it('does not do anything when no keys are found', arrayEqualProperties(['UNDEFINED_KEY'],
			dataProperties
		));
		it('does not do anything when no keys are passed', arrayEqualProperties([],
			dataProperties
		));
	});
});