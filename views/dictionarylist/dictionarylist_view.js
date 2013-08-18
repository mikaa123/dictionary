var BaseTableView = require('../tableview/base_table_view'),
	DropZoneElementView = require('./dictionarylist_element_view');

module.exports = BaseTableView.extend({
	ElementView: DropZoneElementView,
	template: _.template($('#dictionarylist-table-template').html())
});