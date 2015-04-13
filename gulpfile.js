// require gulp
var gulp = require('gulp');

// require plugins
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var cssmin = require('gulp-minify-css');
var gutil = require('gulp-util');
var notifier = require('node-notifier');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');
var uglify = require('gulp-uglify');

// js task
gulp.task('js', function() {
  return gulp.src('./js/circleMenu.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./js/'));
});

// styles task
gulp.task('styles', function() {
  return sass('./sass', {
      style: 'expanded',
      compass: true,
      noCache: true
    })
    .on('error', function(err) {
      gutil.beep();
      notifier.notify({
        'title': 'Error',
        'message': 'Error compiling sass. Check the console.'
      });
      console.log(err);
    })
    .pipe(autoprefixer())
    .pipe(gulp.dest('./css/'))
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./css/'));
});

// default task
gulp.task('default', ['js', 'styles', 'watch']);

// watcher
gulp.task('watch', function() {
  gulp.watch('./js/src/**/*.js', ['js']);
  gulp.watch('./sass/*.scss', ['styles']);
});