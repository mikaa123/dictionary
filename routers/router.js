var CreateSetView = require('../views/create_set'),
	ManageSetsView = require('../views/manage_sets');

module.exports = Backbone.Router.extend({

	initialize: function() {
		this.views = [];
		this.views.createSet = new CreateSetView({
			el: $('#create-set')[0]
		});
		this.views.manageSets = new ManageSetsView({
			el: $('#manage-sets')[0]
		});
	},

	routes: {
		'sets': 'sets',
		'sets/:name': 'set',
		'createSet': 'createSet'
	},

	createSet: function() {
		$('.page').hide();
		$('#create-set').show();
	},

	sets: function() {
		$('.page').hide();
		$('#manage-sets').show();
	}
});