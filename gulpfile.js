'use strict';
var gulp,
    browserify,
    del,
    gulp,
    hbsfy,
    sass,
    source,
    sourcemaps;

gulp = require('gulp'); // Include gulp

// Include our plugins
browserify      = require('browserify');
del             = require('del');
hbsfy           = require("hbsfy"); // <---- THIS RIGHT HERE
sass            = require('gulp-sass');
source          = require('vinyl-source-stream');
sourcemaps      = require('gulp-sourcemaps');


gulp.task('compile', function () {
  var options;

  options = {
    debug: true,
    paths: [
      './node_modules',
      './src/app/'
    ]
  };

  hbsfy.configure({
    extensions: ['hbs']
  });

  browserify('./src/main.js', options)
    .transform(hbsfy)
    .bundle()
    .pipe(source('app.min.js'))
    .pipe(gulp.dest('build/public/assets/js'));
});