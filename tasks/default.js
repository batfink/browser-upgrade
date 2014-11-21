var gulp = require('gulp');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');

gulp.task('dist', function () {
    return gulp.src('./lib/*.js').pipe(uglify()).pipe(gulp.dest('./dist'))
});

gulp.task('demo', function () {
    return gulp.src('./lib/*.js').pipe(gulp.dest('./demo'))
});

gulp.task('watch',  function () {
    gulp.watch('./lib/*.js', ['dist', 'demo']);
    //gulp.watch('slurpedCss/*', [function() { return gulp.src('slurpedCss/*').pipe(gulp.dest('demo/css/')) }])
});

gulp.task('default', ['watch', 'browsersync']);
