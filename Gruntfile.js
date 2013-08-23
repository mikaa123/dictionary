var async = require('async');

module.exports = function(grunt) {
	var exec = require('child_process').exec;

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		distribute: {
			linux: {
				binaryUrl: 'https://s3.amazonaws.com/node-webkit/v0.7.1/node-webkit-v0.7.1-linux-x64.tar.gz',
				extractCommand: 'tar xf bin/temp -C bin/tmp --strip=1'
			}
		}
	});

	grunt.registerMultiTask('distribute', 'Prepares a package for the app.', function() {
		var done = this.async(),
			target = this.target,
			binaryUrl = this.data.binaryUrl,
			extractCommand = this.data.extractCommand;

		async.series([
			function(callback) {
				grunt.log.writeln('Downloading the latest node-webkit binary for ' + target + '...');
				exec('wget ' + binaryUrl + ' -O bin/temp', callback);
			},
			function(callback) {
				grunt.log.writeln('Extracting archive...');
				exec('mkdir bin/tmp; ' + extractCommand + '; rm bin/temp', callback);
			},
			function(callback) {
				grunt.log.writeln('Creating package for the app...');
				exec('zip -q -r bin/tmp/package.nw * -x "*bin*" -x "*.git*"', callback);
			},
			function(callback) {
				grunt.log.writeln('Creating zip file for ' + target + '...');
				exec('zip -q -r -j bin/' + target + '/dictionary.zip bin/tmp/*; rm -rf bin/tmp', callback);
			}
		],
		function(err, results) {
			if (err) grunt.log.error(err);
			done();
		});
	});
};