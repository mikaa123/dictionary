var when = require('when'),
	fs = require('fs');

function readFile(filepath) {
	var deferred = when.defer();
	fs.readFile(filepath, function (err, data) {
		if (err) {
			deferred.reject(err);
		} else {
			deferred.resolve(data);
		}
	});
	return deferred.promise;
}

function writeFile(filepath, dataString) {
	var deferred = when.defer();
	fs.writeFile(filepath, dataString, function(err) {
		if (err) {
			deferred.reject(err);
		} else {
			deferred.resolve();
		}
	});
	return deferred.promise;
}

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
			value = that.valueForKeyArray(dataArray, key);

			if (found) {
				doneCb(value);
			}
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
			that = this;

		// Takes a line and break it into an Object with #key and #val
		var parseLine = function(line) {
			var xmlTagExp = /<.*name=\"(.*?)\">(.*?)<\/.*>/,
				propertiesExp = /^(.*?)=(.*)$/,
				tuple,
				match;

			switch(that.get('type')) {
				case 'xml':
					match = xmlTagExp.exec(line);
					tuple = {
						key: match[1],
						val: match[2]
					};
					break;
				case 'properties':
					match = propertiesExp.exec(line);
					tuple = {
						key: match[1],
						val: match[2]
					};
					break;
			}

			return tuple;
		};

		_.find(array, function(line) {
			var parsedLine = parseLine(line);
			if (parsedLine.key === key) {
				value = parsedLine.val;
				return true;
			}
		});

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
			writeFilePromise.then(function() {
				done();
			});
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
					return '^' + k + '\=';
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