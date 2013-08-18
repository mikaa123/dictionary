module.exports = Backbone.View.extend({
	tagName: 'tr',

	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
		this.render();
		console.log('super initialize called');
	},

	originalEvents: {
		'click a.remove': 'removeElement'
	},

	events: function() {
		return _.extend({},this.originalEvents,this.additionalEvents);
	},

	removeElement: function() {
		console.log('remove called');
		this.model.destroy();
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	}
});