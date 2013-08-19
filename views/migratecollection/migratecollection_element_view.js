module.exports = Backbone.View.extend({
	template: _.template($('#migratekey-template').html()),

	initialize: function() {
		this.listenTo(this.model, 'destroy', this.remove);
		this.render();
	},

	events: {
		'input input': 'updateNewKey'
	},

	updateNewKey: function() {
		this.model.set('newKey', this.$('input').val());
		console.log(this.model.get('newKey'));
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	}
});