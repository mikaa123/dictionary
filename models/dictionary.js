var D = require('d.js'),
	fs = require('fs');

var readFile = D.nodeCapsule(fs, fs.readFile);
var writeFile = D.nodeCapsule(fs, fs.writeFile);

module.exports = Backbone.Model.extend({
	defaults: {
		selected: true
	},

	/**
	 * Returns the value for the given key or undefined if the key doesn't exist.
	 * @param  {String} key
	 * @param  {Function} doneCb
	 * @return {String}
	 */
	valueForKey: function(key, doneCb) {
		var that = this;

		this.dictionaryArray(function(dataArray) {
			var value = that.valueForKeyArray(dataArray, key);
			doneCb(value);
		});
	},

	/**
	 * Takes an array and a key and return a value. This method can be tested.
	 * @param  {Array} array
	 * @param  {String} key
	 * @return {String}
	 */
	valueForKeyArray: function(array, key) {
		var value,
			that = this,
			tuple;

		// Takes a line and break it into an Object with #key and #val
		var parseLine = function(line) {
			var xmlTagExp = /<.*name=\"(.*?)\">(.*?)<\/.*>/,
				propertiesExp = /^(.*?)=(.*)$/,
				tuple = {},
				match;

			switch(that.get('type')) {
				case 'xml':
					match = xmlTagExp.exec(line);
					break;
				case 'properties':
					match = propertiesExp.exec(line);
					break;
			}

			if (match) {
				tuple = {
					key: match[1],
					val: match[2]
				};
			}

			return tuple;
		};

		for (var i = 0; i < array.length; ++i) {
			tuple = parseLine(array[i]);
			if (tuple.key === key) {
				value = tuple.val;
				break;
			}
		};

		return value;
	},

	/**
	 * Appends the <key, val> tuple at the end of the dictionary's file; save it; and returns true or success.
	 * @param {String} key
	 * @param {String} val
	 */
	addEntry: function(key, val) {

	},

	/**
	 * Returns the dictionary file as an array. Useful for caching.
	 * @param  {Function} doneCb
	 * @return {Arrau}
	 */
	dictionaryArray: function(doneCb) {
		readFile(this.get('path')).then(function(data) {
			doneCb(data.toString().split('\n'));
		});
	},

	removeKeys: function(keys, done) {
		var that = this;
		this.dictionaryArray(function(dataArray) {
			var	writeFilePromise = writeFile(that.get('path'), that.removeKeysFromArray(dataArray, keys).join('\n'));
			writeFilePromise.then(done);
		});
	},

	removeKeysFromArray: function(array, keys) {
		var len = array.length,
			that = this;

		var matchKey = function(l) {
			var keyMatcher = function (k) {
				if (that.get('type') === 'xml') {
					return '\"' + k + '\"';
				} else if (that.get('type') === 'properties') {
					return '^' + k + '=';
				}
			};

			return _.some(keys, function(k) { return l.match(keyMatcher(k)); });
		};

		while(len--) {
			if (matchKey(array[len])) {
				array.splice(len, 1);
			}
		}

		return array;
	}
});