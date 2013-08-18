var SetCollectionView = require('../views/setcollection_view');

module.exports = Backbone.View.extend({
	initialize: function() {
		this.setCollectionView = new SetCollectionView({
			collection: DICTIONARY.sets
		});

		this.render();
	},

	events: {
		'click #add-set': 'addSet'
	},

	addSet: function() {
		DICTIONARY.router.navigate('createSet', {
			trigger: true
		});
	},

	render: function() {
		this.$('.set-list').html(this.setCollectionView.el);
	}
});