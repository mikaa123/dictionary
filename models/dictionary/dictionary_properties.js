var Dictionary = require('./dictionary');

module.exports = Dictionary.extend({
	defaults: {
		type: 'properties',
		selected: true
	},

	parseLine: function(line) {
		var regExp = /^(.*?)=(.*)$/,
			match = regExp.exec(line),
			result = {};

		if (match) {
			result.key = match[1];
			result.value = match[2];
		}

		return result;
	},

	writeLine: function(key, value) {
		return key +'='+ value;
	},

	initialize: function(options) {
	}
});