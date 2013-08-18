var SetCollectionElementView = require('./setcollection_element_view');

module.exports = Backbone.View.extend({
	tagName: 'table',
	className: 'table',
	template: _.template($('#setcollection-table-template').html()),

	initialize: function() {
		this.listenTo(this.collection, "add", this.render);
		this.render();
	},

	render: function() {
		this.$el.html(this.template());

		this.collection.each(function(set) {
			var setCollectionElement = new SetCollectionElementView({
				model: set
			});

			this.$('tbody').append(setCollectionElement.el);
		}, this);
		return this;
	}
});