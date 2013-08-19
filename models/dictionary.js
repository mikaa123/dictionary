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

	removeKeys: function(keys, done) {
		var that = this;
		readFile(this.get('path')).then(function(data) {
			var dataArray = data.toString().split('\n'),
				writeFilePromise = writeFile(that.get('path'),
					that.removeKeysFromArray(dataArray, keys).join('\n'));

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