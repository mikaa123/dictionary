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

	events: {
		'click #prompt-close': 'promptCancel',
		'click #prompt-create': 'promptCreate'
	},

	promptCancel: function() {
		this.$('#name-prompt-modal').modal('hide');
	},

	promptCreate: function(e) {
		var dictionaryName = this.$('#set-name-prompt').val();

		if (!dictionaryName) {
			this.$('.form-group').addClass('has-error');
			return;
		}

		DICTIONARY.sets.add({
			name: dictionaryName,
			dictionaries: this.collection
		});

		this.$('#name-prompt-modal').modal('hide');

		DICTIONARY.router.navigate('sets', {
			trigger: true
		});
	},

	render: function() {
		this.$('.dropzone').html(this.dropzoneView.el);
	}
});