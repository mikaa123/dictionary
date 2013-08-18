var CreateSetView = require('../views/create_set');

module.exports = Backbone.Router.extend({

	initialize: function() {
		this.views = [];
		this.views.createSet = new CreateSetView({
			el: $('#create-set')[0]
		});
	},

	routes: {
		'sets': 'sets',
		'sets/:name': 'set',
		'createSet': 'createSet'
	},

	createSet: function() {
		console.log('hey');
		$('.page').hide();
		$('#create-set').show();
	},

	sets: function() {
		$('.page').hide();
		$('#manage-sets').show();
	}
});