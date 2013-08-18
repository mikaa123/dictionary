var when = require('when'),
	fs = require('fs');

function read(filepath) {
	var deferred = when.defer();
	fs.readFile(filepath, function (err, data) {
		if( err ){
				deferred.reject(err);
		} else {
				deferred.resolve(data);
		}
	});
	return deferred.promise;
}

module.exports = Backbone.Model.extend({
	defaults: {
		selected: true
	},

	removeKeys: function(keys) {
		_.each(keys, function(key) {
			this.removeKey(key);
		}, this);
	},

	removeKey: function(key) {
		var readPromise = read(this.get('path'));

		var successCb = function(data) {
			var dataArray =	data.toString().split('\n'),
				line = _.find(dataArray, function(l) {
					debugger;
					if (l.match('\"' + key + '\"')) return true;
				});

				dataArray.splice(dataArray.indexOf(line), 1);

				debugger;
		};

		readPromise.then(successCb);
	}
});