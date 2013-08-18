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
		'keyup #keys': 'keyTyped',
		'click a#delete-keys': 'deleteKeys'
	},

	keyTyped: function() {
		if (this.$('#keys').val()) {
			this.$('#delete-keys').removeAttr('disabled');
		} else {
			this.$('#delete-keys').attr('disabled', 'disabled');
		}
	},

	deleteKeys: function() {
		var keys = _.compact(this.$('#keys').val().replace(/\s+/g, '').split(';')),
			selectedDictionaries = this.dictionaryListView.collection.filter(function(d) {
				return d.get('selected');
			});

		_.each(selectedDictionaries, function(dictionary) {
			dictionary.removeKeys(keys);
		});
	},

	render: function() {
		this.$('.dictionary-list').html(this.dictionaryListView.el);
	}
});