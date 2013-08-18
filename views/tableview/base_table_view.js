module.exports = Backbone.View.extend({
	tagName: 'table',
	className: 'table',

	initialize: function() {
		this.listenTo(this.collection, "add", this.render);
		this.render();
	},

	render: function() {
		this.$el.html(this.template());

		this.collection.each(function(model) {
			var tableElement = new this.ElementView({
				model: model
			});

			this.$('tbody').append(tableElement.el);
		}, this);
		return this;
	}
});