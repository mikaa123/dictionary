var async = require('async');

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

	/**
	 * Migrate the keys of the `oldSet` with this set.
	 * @param  {oldSet}   oldSet
	 * @param  {MigrateKeyCollection}   migrateKeyCollection
	 * @param  {Function(err, migratedKeys)} done - migratedKey is the number of keys migrated
	 */
	migrate: function(oldSet, migrateKeyCollection, done) {
		var migratedKeys = 0;

		// Here's the gist of how the algorithm works.
		// It's going to iterate over the old set of dictionaries; and each time will look for the
		// corresponding dictionary in the new set. Once found, it will take each key and perform in *serie*
		// an insertion into the new dictionary only if the new key isn't already defined.

		async.each(oldSet.get('dictionaries').models, _.bind(function(oldDictionary, callback) {
			var newDictionary = this.getLang(oldDictionary.get('lang'));

			if (newDictionary) {
				async.eachSeries(migrateKeyCollection.models, function(keyTuple, cb) {
					newDictionary.hasKey(keyTuple.get('newKey'), function(hasNewKey) {
						if (hasNewKey) {
							cb();
						} else {
							oldDictionary.valueForKey(keyTuple.get('oldKey'), function(value) {
								if (value) {
									migratedKeys++;
									newDictionary.addEntry(keyTuple.get('newKey'), value, cb);
								} else {
									cb();
								}
							});
						}
					});
				},
				function() {
					callback();
				});
			}
		}, this), function( err ) {
			done(migratedKeys);
		});
	},

	addDictionary: function(dictionary) {
		this.get('dictionaries').add(dictionary);
		this.trigger('change');
	}
});