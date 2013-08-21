var Dictionary = require('./dictionary');

module.exports = Dictionary.extend({
	defaults: {
		type: 'xml',
		selected: true
	},

	parseLine: function(line) {
		var regExp = /<.*name=\"(.*?)\">(.*?)<\/.*>/,
			match = regExp.exec(line),
			result = {};

		if (match) {
			result.key = match[1];
			result.value = match[2];
		}

		return result;
	},

	writeLine: function(key, value) {
		return '<term name="'+ key +'">'+ value +'</term>';
	},

	initialize: function(options) {
	}
});