var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('copy:dist', function () {
    // this task will eventually uglify the js
    return gulp.src('./lib/*.js').pipe(gulp.dest('./dist'))
});

gulp.task('copy:demo', function () {
    return gulp.src('./dist/*.js').pipe(gulp.dest('./demo'))
});

gulp.task('copy:articles', function () {
    return gulp.src('./feed/articles.json').pipe(gulp.dest('./demo'));
})

gulp.task('watch', function () {
    gulp.watch('./lib/*.js', ['copy:dist']);
    gulp.watch('./dist/*.js', ['copy:demo']);
});

gulp.task('default', function () {
    runSequence('get:feed', 'copy:articles', 'copy:dist', 'copy:demo', 'browsersync', 'watch');
});
