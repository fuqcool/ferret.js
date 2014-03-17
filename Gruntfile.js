module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['src/module.js', 'src/util.js', 'src/event.js', 'src/console.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    watch: {
      js: {
        files: 'src/*.js',
        tasks: ['concat']
      }
    }
  });

  grunt.registerTask('dist', ['concat']);

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
};
