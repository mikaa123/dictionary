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

	migrate: function(oldSet, migrateKeyCollection, done) {
		async.each(oldSet.get('dictionaries').models, _.bind(function(oldDictionary, callback) {
			var newDictionary = this.getLang(oldDictionary.get('lang'));

			if (newDictionary) {
				async.each(migrateKeyCollection.models, function(keyTuple, cb) {
					oldDictionary.valueForKey(keyTuple.get('oldKey'), function(value) {
						if (value) {
							newDictionary.addEntry(keyTuple.get('newKey'), value, cb);
						} else {
							cb();
						}
					});
				},
				function() {
					callback();
				});
			}
		}, this), function( err ) {
			done();
		});
	}
});