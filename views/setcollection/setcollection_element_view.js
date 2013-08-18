var BaseElementView = require('../base_element_view');

module.exports = BaseElementView.extend({
	template: _.template([
		'<td><%= name %></td>',
		'<td><%= dictionaries.length %></td>',
		'<td><a href="#" class="manage">manage</a></td>',
		'<td><a href="#" class="remove">remove</a></td>'
		].join('\n')),

	additionalEvents: {
		'click .manage': 'manageElement'
	},

	manageElement: function() {
		DICTIONARY.current = this.model;
		DICTIONARY.router.navigate('set', { trigger: true });
	}
});