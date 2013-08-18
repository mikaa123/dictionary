var BaseElementView = require('../tableview/base_table_element_view');

module.exports = BaseElementView.extend({
	template: _.template([
		'<td><input type="checkbox" value="" checked></td>',
		'<td><%= path %></td>'
		].join('\n'))
});