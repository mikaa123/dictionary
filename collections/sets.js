var DictionarySet = require('../models/dictionary_set'),
	Dictionaries = require('./dictionaries');

module.exports = Backbone.Collection.extend({
	model: DictionarySet,

	addFromJSON: function(sets) {
		_.each(sets, function(set) {
			this.add(new DictionarySet({
				name: set.name,
				selected: set.selected,
				dictionaries: new Dictionaries(set.dictionaries)
			}));
		}, this);
	}
});