var BaseTableView = require('../tableview/base_table_view'),
	SetCollectionElementView = require('./setcollection_element_view');

module.exports = BaseTableView.extend({
	ElementView: SetCollectionElementView,
	template: _.template($('#setcollection-table-template').html())
});