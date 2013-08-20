module.exports = Backbone.Model.extend({
	defaults: {
		selected: false
	},

	/**
	 * Returns the dictionary of the given language if it exists, undefined otherwise.
	 * @param  {String} lang
	 * @return {Dictionary}
	 */
	getLang: function(lang) {
		return _.find(this.get('dictionaries'), function(d) {
			return d.get('lang') === lang;
		});
	},

	migrate: function(oldSet, migrateKeyCollection, done) {
		_.each(oldSet, function(oldDictionary) {
			var newDictionary = this.getLang(oldDictionary.get('lang'));

			if (newDictionary) {
				_.each(migrateKeyCollection, function(keyTuple) {
					var value = oldDictionary.valueForKey(keyTuple.get('oldKey'));

					debugger;
					// if (oldValue) {
					// 	newDictionary.addEntry(keyTuple.get('newKey'), value);
					// }
				});
			}
		}, this);

		// for each dictionaries of oldSet,
		// verify if this set has a dictionary of the same language.
		// if it does, go over each migrateKeyCollection,
		// if the key exists in the olddictionary, copy the value with the new key in the new dictionary.
		// 
		// methods to have
		// ===============
		// 
		// Set#getLang(lang): returns the dictionary of the given language, if it exists; undefined otherwise.
		// 
		// Dictionary#valueForKey({String} key): returns the value for the given key or undefined if the key doesn't.
		// Dictionary#addEntry({String} key, {String} val): appends the <key, val> tuple at the end of the dictionary's file;
		// 													save it, and returns true on success.
	}
});