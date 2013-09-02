var D = require('d.js'),
	fs = require('fs');

var readFile = D.nodeCapsule(fs, fs.readFile);
var writeFile = D.nodeCapsule(fs, fs.writeFile);

module.exports = Backbone.Model.extend({
	defaults: {
		selected: true
	},

	/**
	 * Returns whether the file uses LF for newline.
	 * It's often the case on Windows systems.
	 * @type {Boolean}
	 */
	lineFeed: true,

	/**
	 * Parse a line into a <key, value> tuple.
	 * @abstract
	 * @line {String}
	 * @return {{key: String, value: String}}
	 */
	parseLine: function(line) {
		// Implement in subclass.
	},

	/**
	 * Creates a correctly formated dictionary entry for the key and value.
	 * @param  {String} key
	 * @param  {String} value
	 * @return {String}
	 */
	writeLine: function(key, value) {
		// Implement in subclass.
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
			tuple;

		for (var i = 0; i < array.length; ++i) {
			tuple = this.parseLine(array[i]);
			if (tuple.key === key) {
				value = tuple.value;
				break;
			}
		}

		return value;
	},

	hasKey: function(key, doneCb) {
		var that = this;

		this.dictionaryArray(function(dataArray) {
			var value = that.hasKeyForArray(dataArray, key);
			doneCb(value);
		});
	},

	/**
	 * Calls doneCb with a boolean indicating if the dictionary has the key.
	 * @param  {String}  key
	 * @param  {Function}  doneCb
	 */
	hasKeyForArray: function(array, key) {
		var value = false,
			tuple;

		for (var i = 0; i < array.length; ++i) {
			tuple = this.parseLine(array[i]);
			if (tuple.key === key) {
				value = true;
				break;
			}
		}

		return value;
	},

	/**
	 * Appends the <key, val> tuple at the end of the dictionary's file; save it;
	 * and call the cb.
	 * @param {String} key
	 * @param {String} val
	 * @param {Function} val
	 */
	addEntry: function(key, val, cb) {
		var that = this,
			newEntry = this.writeLine(key, val);

		// Adds a newline if there are no newline at the end of the file.
		var addNewline = function(dataArray) {
			var dataString = dataArray.join('\n');
			if (that.lineFeed) {
				if (dataString.substr(-2) !== '\r\n') dataString += '\r\n';
			} else {
				if (dataString.substr(-1) !== '\n') dataString += '\n';
			}
			return dataString;
		};

		newEntry += (this.lineFeed) ? '\r\n' : '\n';

		this.dictionaryArray(function(dataArray) {
			that.save(addNewline(dataArray).concat(newEntry), cb);
		});
	},

	/**
	 * Returns the dictionary file as an array. Useful for caching.
	 * @param  {Function} doneCb
	 * @return {Arrau}
	 */
	dictionaryArray: function(doneCb) {
		var that = this;
		readFile(this.get('path')).then(function(data) {
			doneCb((function() {
				var dataArray = data.toString().split('\n');
				if (_.last(dataArray[0]) === '\r') that.lineFeed = true;
				return data.toString().split('\n');
			})());
		});
	},

	/**
	 * Rewrites the file with the content of the passed String, and call a cb
	 * @param {String} file
	 * @param {Function} done
	 */
	save: function(file, done) {
		writeFile(this.get('path'), file).then(done);
	},

	removeKeys: function(keys, done) {
		var that = this;
		this.dictionaryArray(function(dataArray) {
			var initialLength = dataArray.length,
				newDataArray = that.removeKeysFromArray(dataArray, keys);
			that.save(newDataArray.join('\n'), done(initialLength - newDataArray.length));
		});
	},

	removeKeysFromArray: function(array, keys) {
		var len = array.length,
			that = this;

		var matchKey = function(l) {
			return _.some(keys, function(k) {
				return that.parseLine(l).key === k;
			});
		};

		while(len--) {
			if (matchKey(array[len])) {
				array.splice(len, 1);
			}
		}

		return array;
	}
});