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
			// Test if file is a dictionary
			this.collection.add({
				'lang': 'FR',
				'type': 'xml',
				'path': file.path
			});
		}, this);
	}
});