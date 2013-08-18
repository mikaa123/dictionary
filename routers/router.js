var CreateSetView = require('../views/create_set'),
	ManageSetView = require('../views/manage_set'),
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

		this.views.manageSet = new ManageSetView({
			el: $('#manage-set')[0],
			dictionaries: DICTIONARY.current.get('dictionaries')
		});

		$('.page').hide();
		$('#manage-set').show();
	}
});