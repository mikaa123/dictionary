module.exports = function(grunt) {
	var exec = require('child_process').exec;

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
	});

	grunt.registerTask('package', 'Package the app for distribution.', function(platform) {
		// var done = this.async(),
		// 	nwBinary = {
		// 		linux: 'https://s3.amazonaws.com/node-webkit/v0.7.1/node-webkit-v0.7.1-linux-x64.tar.gz'
		// 	};

		// grunt.log.writeln('Downloading the latest node-webkit binary for Linux...');
		// exec('wget ' + nwBinary.linux + ' -O bin/temp', function(error, stdout, stderr) {
		// 	if (!error) {
		// 		grunt.log.writeln('Extracting the archive into bin/tmp...');
		// 		exec('mkdir bin/tmp; tar xf bin/temp -C bin/tmp; rm bin/temp', function(error, stdout, stderr) {
		// 			grunt.log.writeln('Creating a .nw package...');
		// 			// exec('find . -! -name "bin" -print | zip bin/tmp/node-webkit-v0.7.1-linux-x64/package.nw -@', function(error, stdout, stderr) {
		// 			// 	grunt.log.writeln('Packaging the app into bin/linux');
		// 			// 	exec('zip bin/tmp/node-webkit-v0.7.1-linux-x64/* bin/linux/dictionary.zip; rm -rf bin/tmp', function(error, stdout, stderr) {
		// 			// 		done();
		// 			// 	});
		// 			// });
		// 		});
		// 	} else {
		// 		done(false);
		// 	}
		// });
	});
};