module.exports = Backbone.View.extend({
	tagName: 'tr',

	initialize: function(options) {
		this.mediator = this.options.mediator;
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
		this.render();
	},

	events: function() {
		return _.extend({},this.originalEvents,this.additionalEvents);
	},

	removeElement: function() {
		this.model.destroy();
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	}
});