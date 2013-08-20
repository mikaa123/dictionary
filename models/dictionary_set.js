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
		return this.get('dictionaries').find(function(d) {
			return d.get('lang') === lang;
		});
	},

	migrate: function(oldSet, migrateKeyCollection, done) {
		oldSet.get('dictionaries').each(function(oldDictionary) {
			var newDictionary = this.getLang(oldDictionary.get('lang'));

			if (newDictionary) {
				migrateKeyCollection.each(function(keyTuple) {
					oldDictionary.valueForKey(keyTuple.get('oldKey'), function(value) {
						if (value) {
							newDictionary.addEntry(keyTuple.get('newKey'), value, done);
						}
						done();
					});
				});
			}
		}, this);
	}
});