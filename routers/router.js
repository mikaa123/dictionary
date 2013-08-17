var CreateSetView = require('../views/create_set');

module.exports = Backbone.Router.extend({

	initialize: function() {
		this.views = [];
		this.views.createSet = new CreateSetView({
			el: $('#create-set')[0]
		});

		this.navigate('sets/new', { trigger: true });
	},

	routes: {
		'sets': 'sets',
		'set': 'set',
		'sets/new': 'createSet'
	},

	createSet: function() {

	}
});