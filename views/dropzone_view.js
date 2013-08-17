var DropZoneElementView = require('../views/dropzone_element_view');

module.exports = Backbone.View.extend({
	tagName: 'table',
	className: 'table',
	template: _.template($('#dropzone-table-template').html()),

	initialize: function() {
		this.listenTo(this.collection, "add", this.render);
		this.render();
	},

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
	},

	render: function() {
		this.$el.html(this.template());

		this.collection.each(function(dictionary) {
			var dropZoneElement = new DropZoneElementView({
				model: dictionary
			});

			this.$('tbody').append(dropZoneElement.el);
		}, this);
		return this;
	}
});