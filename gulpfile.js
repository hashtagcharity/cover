'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    path = require('path'),
    swig = require('gulp-swig'),
    data = require('gulp-data'),
    clean = require('gulp-clean'),
    connect = require('gulp-connect'),
    preprocess = require('gulp-preprocess'),
    plumber = require('gulp-plumber');



var server = { 
  host: 'localhost', 
  port: '8080' 
};

var base_dir  = __dirname;
var build_dir = base_dir + '/dist';

var env = process.env.NODE_ENV || 'DEV';
var context = function() {
              if (env=='DEV') { 
                return { context: { CDN: '' } }
              } else {
                return { context: { CDN: 'http://d3g7icikgyxmdp.cloudfront.net/' } }
              }}();

var files = {
  images: base_dir + '/img/**/*.*',
  js: base_dir + '/js/**/*.js',
  startup: base_dir + '/startup/**/*',
  fonts: base_dir + '/static/fonts/**/*',
  css: base_dir + '/static/css/**/*.css',
  video: base_dir + '/video/**/*',
  templates: base_dir + '/static/html/**/*.html',
  template_text: base_dir + '/static/html/**/*.json',
  less: [base_dir + '/static/less/**/*.less', base_dir + '/less-files/*.less']
};

gulp.task('clean', function () {
  return gulp.src(build_dir, { read: false })
             .pipe(clean());
});


var getJsonData = function(file) {
  return require(base_dir + '/static/html/' + path.basename(file.path) + '.json');
};


gulp.task('templates', function() {
  var opts = {
    load_json: true,
    defaults: { cache: false }
  };

  return gulp.src(base_dir + '/static/html/*.html')
             .pipe(plumber())
             .pipe(swig(opts))
             .pipe(preprocess(context))
             .pipe(gulp.dest(base_dir));
});

gulp.task('styles', function () {
  return gulp.src(base_dir + '/static/less/style.less')
             .pipe(plumber())
             .pipe(less({ paths: [ path.join(base_dir, 'less', 'includes') ] }))
             .pipe(cssmin())
             .pipe(preprocess(context))
             .pipe(rename({suffix: '.min'}))
             .pipe(gulp.dest(base_dir + '/static/css'));
});

gulp.task('preprocess', function() {
  return gulp.src(base_dir + '/static/css/style.min.css')
             .pipe(plumber())
             .pipe(preprocess(context))
             .pipe(gulp.dest(base_dir + '/static/cssss'));
});


gulp.task('connect', function() {
  connect.server({
    root: base_dir,
    host: server.host,
    port: server.port,
    livereload: true
  });
});


gulp.task('reload', ['build'], function() {
  gulp.src('./*.html')
      .pipe(connect.reload());
});


gulp.task('watch', ['connect'], function() { 
  var watched = [
    files.js, files.less[0], files.less[1], files.templates, files.template_text
  ];

  gulp.watch(watched, ['reload']);
});


gulp.task('copy', ['default'], function() {
  var filesToCopy = [
    files.images, files.js, files.startup, files.fonts, files.css, files.video,
    './*.html'
  ];

  gulp.src(filesToCopy, { base: base_dir })
      .pipe(gulp.dest(build_dir));
});


gulp.task('build', ['templates', 'styles']);

gulp.task('default', ['clean', 'build']);

gulp.task('ci', ['copy']);