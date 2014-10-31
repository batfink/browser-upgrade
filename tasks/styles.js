var gulp = require('gulp');
var less = require('less');
var lessNpmImport = require('less-plugin-npm-import');
var fs = require('fs');

function readFile(filename, enc) {


    return new Promise(function(resolve, reject) {


        fs.readFile(filename, enc, function(error, result) {

            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        })

    });
};

gulp.task('styles', function() {

    var arenaCSS = 'amedia-assets-arena/css/design2.src.css';
    var options = { plugins: [ lessNpmImport ] };


    //console.log(readFile('css/test.less'));
    readFile('css/test.less', 'utf8').then(console.log.bind(console));


    // less.render('@import (less, reference) "npm://' + arenaCSS + '"; .test:extend(.am-megaMenu-category-title) { background: red }', options)
    //     .then(function(css) {
    //         console.log(css.css);
    //     })
    //     .catch(function(error) {
    //         console.error(error);
    //     });

});
