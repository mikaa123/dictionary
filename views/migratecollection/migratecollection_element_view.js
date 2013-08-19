module.exports = Backbone.View.extend({
	template: _.template($('#migratekey-template').html()),

	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
		this.render();
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	}
});