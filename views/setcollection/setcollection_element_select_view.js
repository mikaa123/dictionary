var BaseElementView = require('../tableview/base_table_element_view');

module.exports = BaseElementView.extend({
	template: _.template([
		'<td></td>',
		'<td><%= name %></td>',
		'<td><%= dictionaries.length %></td>',
	].join('\n')),
});