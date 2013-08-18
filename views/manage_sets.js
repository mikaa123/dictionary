var SetCollectionView = require('../views/setcollection_view');

module.exports = Backbone.View.extend({
	initialize: function() {
		this.setCollectionView = new SetCollectionView({
			collection: DICTIONARY.sets
		});

		this.render();
	},

	render: function() {
		this.$('.set-list').html(this.setCollectionView.el);
	}
});