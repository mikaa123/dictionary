var DropZoneView = require('../views/dropzone_view'),
	DictionaryCollection = require('../collections/dictionaries');

module.exports = Backbone.View.extend({
	initialize: function() {
		this.dropzoneView = new DropZoneView({
			collection: new DictionaryCollection()
		});

		this.render();
	},

	render: function() {
		this.$('.dropzone').html(this.dropzoneView.el);
	}
});