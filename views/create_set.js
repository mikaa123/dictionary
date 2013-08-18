var DropZoneView = require('../views/dropzone_view'),
	DictionaryCollection = require('../collections/dictionaries');

module.exports = Backbone.View.extend({
	initialize: function() {
		this.newSet();
	},

	newSet: function() {
		this.dictionaries = new DictionaryCollection();
		this.dropzoneView = new DropZoneView({
			collection: this.dictionaries
		});

		this.listenTo(this.dictionaries, 'add', function() {
			this.$('#createBtn').removeAttr('disabled');
		});

		this.listenTo(this.dictionaries, 'remove', function() {
			if (!this.dictionaries.length) {
				this.$('#createBtn').attr('disabled', 'disabled');
			}
		});

		this.render();
		this.$('#createBtn').attr('disabled', 'disabled');
		this.$('#set-name-prompt').val('');
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
			dictionaries: this.dictionaries
		});

		this.$('#name-prompt-modal').modal('hide');

		this.stopListening(this.dictionaries);
		this.newSet();

		DICTIONARY.router.navigate('sets', {
			trigger: true
		});
	},

	render: function() {
		this.$('.dropzone').html(this.dropzoneView.el);
	}
});