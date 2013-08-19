var BaseElementView = require('../tableview/base_table_element_view');

module.exports = BaseElementView.extend({
	template: _.template([
		'<td><input type="checkbox" value="" <%= selected?"checked":"" %>></td>',
		'<td><%= path %></td>',
		'<td><%= lang %></td>',
		'<td><%= type %></td>'
		].join('\n')),

	additionalEvents: {
		'click input': 'selection'
	},

	selection: function() {
		if (this.$('input').attr('checked')) {
			this.model.set('selected', true);
		} else {
			this.model.set('selected', false);
		}
	}
});