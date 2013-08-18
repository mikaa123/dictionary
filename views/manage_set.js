var DictionaryListView = require('./dictionarylist/dictionarylist_view');

module.exports = Backbone.View.extend({
	initialize: function(options) {
		this.dictionaryListView = new DictionaryListView({
			collection: options.dictionaries
		});

		this.render();
	},

	render: function() {
		this.$('.dictionary-list').html(this.dictionaryListView.el);
	}
});