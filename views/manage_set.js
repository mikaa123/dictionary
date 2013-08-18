module.exports = Backbone.View.extend({
	initialize: function() {
		this.render();
	},

	render: function() {
		this.$('.dictionary-list').html(this.setCollectionView.el);
	}
});