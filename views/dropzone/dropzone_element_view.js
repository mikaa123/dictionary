var BaseElementView = require('../base_element_view');

module.exports = BaseElementView.extend({
	template: _.template([
		'<td><%= lang %></td>',
		'<td><%= type %></td>',
		'<td><a href="#" class="remove">remove</a></td>'
		].join('\n')),

	additionalEvents: {
		'click a.remove': 'removeElement'
	}
});