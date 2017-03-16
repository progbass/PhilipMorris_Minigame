// Generated on 2014-03-28 using generator-phaser-official 0.0.8-rc-2
'use strict';
var config = require('./config.json');
var _ = require('underscore');
_.str = require('underscore.string');

// Mix in non-conflict functions to Underscore namespace if you want
_.mixin(_.str.exports());


module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
 

 
  grunt.initConfig({

    // WATCH
    watch: {
      dev:{
        files : [
          'scss/**/*.scss',
          'css/**/*.css',
          'js/**/*.js',
          'game/**/*.js'
        ],
        tasks : ['build'],
        option: {}
      }  
    },


    // BROWSER SYNC
    browserSync: {
      bsFiles: {
        src : [
          'scss/**/*.scss',
          'css/**/*.css',
          'game/**/*.js',
          './*.html',
        ]
      },

      options: {
        server: [".", "dist"],
        watchTask: true,
        //reloadDelay: 4000,
        //port: 9000,
        open: true,
      }
    },

    // OPEN
    open: {
      server: {
        path: 'http://localhost'
      }
    },


    // COPY
    copy: {
      dist: {
        files: [
          // includes files within path and its sub-directories
          { expand: true, src: ['assets/**'], dest: 'dist/' },
          { expand: true, flatten: true, src: ['game/plugins/*.js'], dest: 'dist/js/plugins/' },
          { expand: true, flatten: true, src: ['bower_components/**/build/*.js'], dest: 'dist/js/' },
          //{ expand: true, flatten: true, src: ['bower_components/phaser-official/src/phaser.js'], dest: 'dist/js/' },
          { expand: true, src: ['css/**'], dest: 'dist/' },
          { expand: true, src: ['index.html'], dest: 'dist/' }
        ]
      }
    },


    // BROWSERIFY
    browserify: {
      build: {
        src: ['game/main.js'],
        dest: 'dist/js/game.js'
      }
    }
  });
  


  grunt.registerTask('build', ['browserify','copy']);
  grunt.registerTask('serve', ['build', 'browserSync', 'watch']);
  grunt.registerTask('default', ['serve']);
  grunt.registerTask('prod', ['build', 'copy']);

  grunt.registerTask('buildBootstrapper', 'builds the bootstrapper file correctly', function() {
    var stateFiles = grunt.file.expand('game/states/*.js');
    var gameStates = [];
    var statePattern = new RegExp(/(\w+).js$/);
    stateFiles.forEach(function(file) {
      var state = file.match(statePattern)[1];
      if (!!state) {
        gameStates.push({shortName: state, stateName: _.capitalize(state) + 'State'});
      }
    });
    config.gameStates = gameStates;
    console.log(config);
    var bootstrapper = grunt.file.read('templates/_main.js.tpl');
    bootstrapper = grunt.template.process(bootstrapper,{data: config});
    grunt.file.write('game/main.js', bootstrapper);
  });
};