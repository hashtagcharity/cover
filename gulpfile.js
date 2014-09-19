var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    swig = require('gulp-swig'),
    data = require('gulp-data'),
    notify = require('gulp-notify');

gulp.task('styles', function () {
    gulp.src('./static/less/style.less')
          .pipe(less({ paths: [ path.join(__dirname, 'less', 'includes') ] }))
          .pipe(gulp.dest('./static/css'))
          .pipe(notify({ message: 'Styles task complete' }));
});

var getJsonData = function(file) {
    return require('./static/html/' + path.basename(file.path) + '.json');
};

gulp.task('templates', function() {
    gulp.src('./static/html/index.html')
          .pipe(data(getJsonData))
          .pipe(swig())
          .pipe(gulp.dest('./'))
          .pipe(notify({ message: 'Templates task complete' }));
});

gulp.task('default', ['styles', 'templates']);
gulp.task('ci', ['default']);