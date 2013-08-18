module.exports = Backbone.View.extend({
	tagName: 'tr',
	template: _.template([
		'<td><%= name %></td>',
		'<td><%= size %></td>',
		'<td><a href="#" class="manage">manage</a></td>',
		'<td><a href="#" class="remove">remove</a></td>'
		].join('\n')),

	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
		this.render();
	},

	events: {
		'click .remove': 'removeElement'
	},

	removeElement: function() {
		this.model.destroy();
	},

	render: function() {
		this.$el.html(this.template({
			name: this.model.get('name'),
			size: this.model.get('dictionaries').length
		}));
		return this;
	}
});