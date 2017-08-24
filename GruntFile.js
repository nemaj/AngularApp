module.exports = function(grunt) {
  // Do grunt-related things in here
  var gtx = require('gruntfile-gtx').wrap(grunt);

  gtx.loadAuto();

  var gruntConfig = require('./grunt');
  gruntConfig.package = require('./package.json');


  // console.log(gruntConfig, 'gruntConfig');
  

  gtx.config(gruntConfig);

  // we need this in order to develop
  gtx.alias('build:dev', [
      'clean:dev',
      'copy:dev',
      'concat:dev',  
      'cssmin:dev',
      'uglify:dev'
  ])

  gtx.finalise();

  // Default task(s).
  grunt.registerTask('default', []);
};