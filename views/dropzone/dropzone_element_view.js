var BaseElementView = require('../tableview/base_table_element_view');

module.exports = BaseElementView.extend({
	template: _.template([
		'<td><%= lang %></td>',
		'<td><%= type %></td>',
		'<td><a href="#" class="remove">remove</a></td>'
		].join('\n'))
});