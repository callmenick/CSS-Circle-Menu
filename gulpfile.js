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
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

// js task
gulp.task('js', function() {
  return gulp.src('./js/src/**/*.js')
    .pipe(uglify().on('error', function(err) {
      console.log('Uglify error:', err);
      this.emit('end');
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./js/dist/'));
});

// styles task
gulp.task('styles', function() {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./css/'))
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./css/'));
});

// default task
gulp.task('default', ['js', 'styles']);

// watch task
gulp.task('watch', ['js', 'styles'], function() {
  gulp.watch('./js/src/**/*.js', ['js']);
  gulp.watch('./sass/*.scss', ['styles']);
});
