var DictionarySet = require('../models/dictionary_set'),
	Dictionaries = require('../collections/dictionaries');
	dictionaryFactory = require('../models/dictionary/dictionary_factory');

module.exports = Backbone.Collection.extend({
	model: DictionarySet,

	addFromJSON: function(sets) {
		_.each(sets, function(set) {
			var newSet = new DictionarySet({
				name: set.name,
				selected: set.selected,
				dictionaries: new Dictionaries()
			});

			_.each(set.dictionaries, function(dictionary) {
				newSet.addDictionary(new dictionaryFactory(dictionary));
			});

			this.add(newSet);
		}, this);
	}
});