var BaseTableView = require('../tableview/base_table_view'),
	SetCollectionElementView = require('./setcollection_element_view');

module.exports = BaseTableView.extend({
	ElementView: SetCollectionElementView,
	template: _.template($('#setcollection-table-template').html()),

	initialize: function(options) {
		this.ElementView = options.ElementView || this.ElementView;
		this.template = options.template || this.template;
		BaseTableView.prototype.initialize.apply(this, arguments);
	}
});