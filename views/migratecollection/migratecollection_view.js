var BaseTableView = require('../tableview/base_table_view'),
	MigrateCollectionElementView = require('./migratecollection_element_view');

module.exports = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.collection, "add", this.render);
		this.render();
	},

	render: function() {
		this.$el.html('');
		this.collection.each(function(migratekey) {
			this.$el.append(new MigrateCollectionElementView({
				model: migratekey
			}).el);
		}, this);
		return this;
	}
});