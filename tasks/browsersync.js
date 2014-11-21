var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('browsersync', ['slurp', 'demo'], function() {
    browserSync({
        server: {
            baseDir: 'demo'
        }
    });

    gulp.watch(['demo/app.js', 'demo/index.html'], reload);
});
