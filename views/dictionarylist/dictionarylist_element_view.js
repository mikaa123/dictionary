var BaseElementView = require('../tableview/base_table_element_view');

module.exports = BaseElementView.extend({
	template: _.template([
		'<td><input type="checkbox" value="" <%= selected?"checked":"" %>></td>',
		'<td><%= path %></td>',
		'<td><%= lang %></td>',
		'<td><%= type %></td>'
	].join('\n')),

	additionalEvents: {
		'click': 'toggleSelection'
	},

	toggleSelection: function() {
		if (this.model.get('selected')) {
			this.model.set('selected', false);
		} else {
			this.model.set('selected', true);
		}
	}
});