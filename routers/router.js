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
		'set': 'set',
		'createSet': 'createSet'
	},

	createSet: function() {
		$('.page').hide();
		$('#create-set').show();
	},

	sets: function() {
		$('.page').hide();
		$('#manage-sets').show();
	},

	set: function() {
		if (!DICTIONARY.current) {
			this.navigate('createSet', { trigger: true });
			return;
		}

		$('.page').hide();
		$('#set').show();
	}
});