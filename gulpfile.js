'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    path = require('path'),
    swig = require('gulp-swig'),
    data = require('gulp-data'),
    del = require('del'),
    runSequence = require('run-sequence'),
    connect = require('gulp-connect'),
    preprocess = require('gulp-preprocess'),
    uglify = require('gulp-uglify'),
    gulpif = require('gulp-if'),
    plumber = require('gulp-plumber');


var server = { 
  host: 'localhost', 
  port: '8080' 
};

var base_dir  = __dirname;
var build_dir = base_dir + '/dist';

var env = process.env.NODE_ENV || 'DEV';
var context = 
              isProd ?  
                { context: { CDN: 'http://d3g7icikgyxmdp.cloudfront.net/', env: env } }
              : 
                { context: { CDN: '', env: env } };
var isProd = (env === 'PROD');

gulp.task('clean', function (cb) {
  del(['dist'], cb);
});


gulp.task('templates', function() {
  var opts = {
    load_json: true,
    defaults: { cache: false }
  };

  return gulp.src('static/html/*.html', { base: base_dir + '/static/html' })
             .pipe(plumber())
             .pipe(swig(opts))
             .pipe(preprocess(context))
             .pipe(gulp.dest(build_dir));
});

gulp.task('styles', function () {
  return gulp.src('static/less/style.less')
             .pipe(plumber())
             .pipe(less({ paths: [ path.join(base_dir, 'less', 'includes') ] }))
             .pipe(cssmin())
             .pipe(preprocess(context))
             .pipe(rename({ suffix: '.min' }))
             .pipe(gulp.dest(build_dir + '/static/css'));
});


gulp.task('compress', function() {
  return gulp.src(['js/main.js', 'js/social.js'])
             .pipe(gulpif(isProd, uglify()))
             .pipe(gulpif(isProd, rename({ suffix: '.min' })))
             .pipe(gulp.dest(build_dir + '/js'))
});


gulp.task('copy', function() {
  var toCopy = ['static/css/**/*.css', 'static/fonts/**/*.*', 'js/lib/**/*.js', 'startup/**/*.*', 'video/**/*.*', 'img/**/*.*'];
  return gulp.src(toCopy, { base: '.'})
             .pipe(gulp.dest(build_dir));  
});


gulp.task('connect', function() {
  connect.server({
    root: build_dir,
    host: server.host,
    port: server.port,
    livereload: true
  });
});


gulp.task('reload', function() {
  return gulp.src(['dist/*.html'])
             .pipe(plumber())
             .pipe(connect.reload());
});


gulp.task('watch', ['connect'], function() { 
  gulp.watch( [ 'static/html/**/*' ], ['templates', 'reload']);
  gulp.watch( [ 'js/**/*' ], ['compress', 'reload']);
  gulp.watch( [ 'static/less/**/*', 'less-files/**/* '], ['styles', 'reload']);
});


gulp.task('build', ['templates', 'styles', 'compress', 'copy']);

gulp.task('default', function() {
  runSequence('clean', 'build');
});