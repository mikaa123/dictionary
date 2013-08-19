var BaseTableView = require('../tableview/base_table_view'),
	DropZoneElementView = require('./dropzone_element_view');

module.exports = BaseTableView.extend({
	ElementView: DropZoneElementView,
	template: _.template($('#dropzone-table-template').html()),

	events: {
		'dragenter': 'dragenter',
		'dragleave': 'dragleave',
		'drop': 'drop'
	},

	dragenter: function() {
		console.log('drag file');
	},

	dragleave: function() {
		console.log('byebye');
	},

	drop: function(e) {
		e.preventDefault();
		_.each(e.originalEvent.dataTransfer.files, function(file) {
			var nameFormat = /dictionary\_(.*)?\.(xml|properties)$/g.exec(file.path);

			if (!nameFormat) {
				return;
			}

			this.collection.add({
				'lang': nameFormat[1],
				'type': nameFormat[2],
				'path': file.path
			});
		}, this);
	}
});