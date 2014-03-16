module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['src/module.js', 'src/util.js', 'src/http.js', 'src/event.js', 'src/console.js'],
        dest: 'bower-ferret/<%= pkg.name %>.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
};
