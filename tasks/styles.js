var gulp = require('gulp');
var less = require('less');
var lessNpmImport = require('less-plugin-npm-import');
var fs = require('fs');

function readFile(filename) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filename, 'utf8', function(error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        })
    });
};

function writeFile(filename, content) {
    return new Promise(function(resolve, reject) {
        fs.writeFile(filename.replace('.less', '.css'), content, function(error) {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        })
    });
};

function renderLess(lessfile) {
    var options = { plugins: [ lessNpmImport ] };
    return less.render(lessfile, options)
        .then(function(css) {
            return css.css;
        }, function(error) {
            return Error(error);
        });
};

function handleError(error) {
    console.error(error);
};

gulp.task('styles', function() {

    var lessFile = 'css/styles.less';

    return readFile(lessFile)
        .then(renderLess)
        .then(writeFile.bind(undefined, lessFile))
        .catch(handleError);
});
