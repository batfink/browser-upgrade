var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('browsersync', function() {
    browserSync({
        server: {
            baseDir: './demo'
        }
    });

    gulp.watch(['demo/**/*'], reload);
});
