var BaseTableView = require('../tableview/base_table_view'),
	SetCollectionElementView = require('./setcollection_element_view');

module.exports = BaseTableView.extend({
	ElementView: SetCollectionElementView,
	template: _.template($('#setcollection-table-template').html()),

	initialize: function(options) {
		if (!options.mediator) throw "A meditator object is needed.";
		this.ElementView = options.ElementView || this.ElementView;
		this.template = options.template || this.template;
		BaseTableView.prototype.initialize.call(this, options);
	}
});