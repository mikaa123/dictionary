var BaseTableView = require('../tableview/base_table_view'),
	DropZoneElementView = require('./dropzone_element_view'),
	dictionaryFactory = require('../../models/dictionary/dictionary_factory');

module.exports = BaseTableView.extend({
	ElementView: DropZoneElementView,
	template: _.template($('#dropzone-table-template').html()),
	emptyTemplate: _.template($('#dropzone-empty-template').html()),

	events: {
		'drop': 'drop'
	},

	addFile: function(file) {
		var nameFormat = /dictionary\_(.*)?\.(xml|properties)$/g.exec(file.path);

		if (!nameFormat) {
			return;
		}

		this.collection.add(dictionaryFactory({
			'lang': nameFormat[1],
			'type': nameFormat[2],
			'path': file.path
		}));
	},

	drop: function(e) {
		var that = this;

		e.preventDefault();
		_.each(e.originalEvent.dataTransfer.files, function(file) {
			that.addFile(file);
		}, this);
	}
});
