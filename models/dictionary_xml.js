var Dictionary = require('./dictionary');

module.exports = Dictionary.extend({
	defaults: {
		type: 'xml',
		selected: true
	},

	initialize: function(options) {
		console.log('new xml');
	}
});