module.exports = function(grunt) {
  var exec = require('child_process').exec;

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          'css/base.css': 'css/base.scss'
        }
      }
    },

    watch: {
      reload: {
        files: 'index.html',
      },
      scss: {
        files: 'css/base.scss',
        tasks: 'sass'
      }
    }
  });

  grunt.event.on('watch', function(action, path, target) {
    if (target === 'reload') {
      // exec('nw .');
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
};