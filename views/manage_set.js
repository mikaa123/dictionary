var DictionaryListView = require('./dictionarylist/dictionarylist_view');

module.exports = Backbone.View.extend({
	initialize: function(options) {
		this.dictionaryListView = new DictionaryListView({
			collection: options.dictionaries
		});

		this.render();
		this.$('#delete-keys').attr('disabled', 'disabled');
		this.$('#keys').val('');
	},

	events: {
		'keyup #keys': 'keyTyped'
	},

	keyTyped: function() {
		if (this.$('#keys').val()) {
			this.$('#delete-keys').removeAttr('disabled');
		} else {
			this.$('#delete-keys').attr('disabled', 'disabled');
		}
	},

	render: function() {
		this.$('.dictionary-list').html(this.dictionaryListView.el);
	}
});