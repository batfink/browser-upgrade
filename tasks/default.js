var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('copy:dist', function () {
    // this task will eventually uglify the js
    return gulp.src('./lib/app.js').pipe(gulp.dest('./dist'))
});

gulp.task('copy:demo', ['copy:dist'], function () {
    return gulp.src('./dist/app.js').pipe(gulp.dest('./demo'))
});

gulp.task('default', function () {
    runSequence('get:feed', 'copy:demo', 'browsersync');
});
