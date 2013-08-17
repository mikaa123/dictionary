var DropZoneView = require('../views/dropzone_view'),
	DictionaryCollection = require('../collections/dictionaries');

module.exports = Backbone.View.extend({
	initialize: function() {
		var dictionaries = new DictionaryCollection();
		this.dropzoneView = new DropZoneView({
			collection: dictionaries
		});

		this.listenTo(dictionaries, 'add', function() {
			this.$('#createBtn').removeAttr('disabled');
		});

		this.listenTo(dictionaries, 'remove', function() {
			if (!dictionaries.length) {
				this.$('#createBtn').attr('disabled', 'disabled');
			}
		});

		this.render();
	},

	render: function() {
		this.$('.dropzone').html(this.dropzoneView.el);
	}
});