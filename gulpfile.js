'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    swig = require('gulp-swig'),
    data = require('gulp-data'),
    clean = require('gulp-clean'),
    connect = require('gulp-connect');

var base_dir  = __dirname;
var build_dir = base_dir + '/dist';

gulp.task('clean', function () {
  return gulp.src(build_dir, {read: false})
             .pipe(clean());
});

var getJsonData = function(file) {
  return require(base_dir + '/static/html/' + path.basename(file.path) + '.json');
};

gulp.task('templates', function() {
  return gulp.src(base_dir + '/static/html/*.html')
             .pipe(data(getJsonData))
             .pipe(swig())
             .pipe(gulp.dest(base_dir));
});

gulp.task('styles', function () {
  return gulp.src(base_dir + '/static/less/style.less')
             .pipe(less({ paths: [ path.join(base_dir, 'less', 'includes') ] }))
             .pipe(gulp.dest(base_dir + '/static/css'));
});


var files = {
  images: [base_dir + '/img/**/*.png', base_dir + '/img/**/*.jpg'],
  js: base_dir + '/js/**/*.js',
  startup: base_dir + '/startup/**/*',
  fonts: base_dir + '/static/font/**/*.OTF',
  css: base_dir + '/static/css/**/*.css',
  video: base_dir + '/video/**/*',
  templates: base_dir + '/static/html/**/*.html',
  template_text: base_dir + '/static/html/**/*.json',
  less: base_dir + '/static/less/**/*.less'
};


gulp.task('connect', function() {
  connect.server({
    root: base_dir,
    port: 8080,
    livereload: true
  });
});


gulp.task('reload', ['build'], function() {
  gulp.src('./*.html')
      .pipe(connect.reload());
});


gulp.task('watch', ['connect'], function() { 
  var watched = [
    files.js, files.less, files.templates, files.template_text
  ];

  gulp.watch(watched, ['reload']);
});


gulp.task('copy', ['default'], function() {
  var filesToCopy = [
    files.images[0], files.images[1], 
    files.js, files.startup, files.fonts, files.css, files.video,
    './index.html'
  ];

  gulp.src(filesToCopy, { base: base_dir })
             .pipe(gulp.dest(build_dir));
});


gulp.task('build', ['templates', 'styles']);

gulp.task('default', ['clean', 'build']);

gulp.task('ci', ['copy']);