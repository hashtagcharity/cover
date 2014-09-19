var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    swig = require('gulp-swig'),
    data = require('gulp-data'),
    notify = require('gulp-notify')
    clean = require('gulp-clean');

var base_dir  = __dirname;
var build_dir = base_dir + '/dist';

gulp.task('clean', function () {
  return gulp.src(build_dir, {read: false})
    .pipe(clean());
});

var getJsonData = function(file) {
    return require(base_dir + '/static/html/' + path.basename(file.path) + '.json');
};

gulp.task('templates', ['clean'], function() {
    return gulp.src(base_dir + '/static/html/*.html')
               .pipe(data(getJsonData))
               .pipe(swig())
               .pipe(gulp.dest(base_dir))
               .pipe(notify({ message: 'Templates task complete' }));
});

gulp.task('styles', ['clean'], function () {
    return gulp.src(base_dir + '/static/less/**/*.less')
               .pipe(less({ paths: [ path.join(base_dir, 'less', 'includes') ] }))
               .pipe(gulp.dest(base_dir + '/static/css'))
               .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('copy', ['default'], function() {
  var filesToMove = [
        './img/**/*',
        './js/**/*',
        './startup/**/*',
        './static/font/**/*',
        './static/css/**/*',
        './video/**/*',
        './*.html'
  ];

  return gulp.src(filesToMove, { base: base_dir })
             .pipe(gulp.dest(build_dir));
//  gulp.src(base_dir + '/img/**/*').pipe(gulp.dest(build_dir + '/img'))
//  gulp.src(base_dir + '/js/**/*').pipe(gulp.dest(build_dir + '/js'))
//  gulp.src(base_dir + '/startup/**/*').pipe(gulp.dest(build_dir + '/startup'))
//  gulp.src(base_dir + '/static/font/**/*').pipe(gulp.dest(build_dir + '/static/font'))
//  gulp.src(base_dir + '/static/css/**/*').pipe(gulp.dest(build_dir + '/static/css'))
//  gulp.src(base_dir + '/video/**/*').pipe(gulp.dest(build_dir + '/video'))
//  return gulp.src(base_dir + '/*.html').pipe(gulp.dest(build_dir))
//             .pipe(notify({ message: 'Copy task complete' }));
});

gulp.task('build', ['templates', 'styles']);

gulp.task('default', ['build']);

gulp.task('ci', ['copy']);