module.exports = Backbone.View.extend({
	tagName: 'tr',
	template: _.template([
		'<td><%= lang %></td>',
		'<td><%= type %></td>',
		'<td><a href="#">remove</a></td>'
		].join('\n')),

	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
		this.render();
	},

	events: {
		'click a': 'removeElement'
	},

	removeElement: function() {
		this.model.destroy();
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	}
});