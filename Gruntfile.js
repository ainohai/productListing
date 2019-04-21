'use strict';
const webpackConfig = require('./webpack.config.js');
module.exports = function(grunt) {

  grunt.initConfig({
    webpack: {
        options: {
          stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
        },
        prod: webpackConfig,
        dev: Object.assign({ watch: false }, webpackConfig)
    },
      sass: {
          dist: {
              files: {
                  "../../public/css/main.css": "../../styles/main.scss"
              }
          },
      },
    watch: {
        files: ['../../styles/*.scss',
            '../../styles/*/*.scss',
            './*.js',
            './*/*.js',
            './*/*/*.js',
            './*/*/*/*.js',
            '!./dist/*.js'
        ],
        tasks: ['sass', 'webpack']
    }
  });

  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

  // Register tasks
  grunt.registerTask('default', [
    'webpack', 'sass', 'watch'
  ]);
  /*grunt.registerTask('dev', [
    //'jshint',
    'less:dev',
    'autoprefixer:dev',
    'concat'
  ]);
  grunt.registerTask('build', [
    //'jshint',
    'less:build',
    'autoprefixer:build',
    'uglify',
    'modernizr',
    'version'
  ]);*/
};
