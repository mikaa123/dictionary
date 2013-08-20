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

	},

	migrate: function(oldSet, migrateKeyCollection, done) {
		// for each dictionaries of oldSet,
		// verify if this set has a dictionary of the same language.
		// if it does, go over each migrateKeyCollection,
		// if they key exists in the olddictionary, copy the value with the new key in the new dictionary.
		// 
		// methods to have
		// ===============
		// 
		// Set#hasLang(lang): returns true if the set has a dictionary for this language.
		// Set#getLang(lang): returns the dictionary of the given language, if it exists; undefined otherwise.
		// 
		// Dictionary#valueForKey({String} key): returns the value for the given key or undefined if the key doesn't.
		// Dictionary#addEntry({String} key, {String} val): appends the <key, val> tuple at the end of the dictionary's file;
		// 													save it, and returns true on success.
	}
});