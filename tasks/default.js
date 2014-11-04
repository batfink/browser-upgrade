var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('copy:dist', function () {
    // this task will eventually uglify the js
    return gulp.src('./lib/*.js').pipe(gulp.dest('./dist'))
});

gulp.task('copy:demo', function () {
    return gulp.src('./dist/*.js').pipe(gulp.dest('./demo'))
});

gulp.task('copy:styles', function () {
    return gulp.src('./css/*.css').pipe(gulp.dest('./demo'));
});

gulp.task('copy:articles', function () {
    return gulp.src('./feed/articles.json').pipe(gulp.dest('./demo/feed'));
});

gulp.task('watch', function () {
    gulp.watch('./lib/*.js', ['copy:dist']);
    gulp.watch('./dist/*.js', ['copy:demo']);
    gulp.watch('./css/*.css', ['copy:styles']);
    gulp.watch('./css/*.less', ['styles']);
});

gulp.task('default', function () {
    runSequence('get:feed', 'copy:articles', 'copy:dist', 'copy:demo', 'styles', 'copy:styles', 'browsersync', 'watch');
});
