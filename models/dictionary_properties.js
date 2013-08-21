var Dictionary = require('./dictionary');

module.exports = Dictionary.extend({
	defaults: {
		type: 'properties',
		selected: true
	},

	initialize: function(options) {
		console.log('new properties');
	}
});