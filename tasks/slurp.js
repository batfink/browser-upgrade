var gulp = require('gulp');
var jsdom = require('jsdom');
var request = require('request');
var fs = require('fs');
var path = require('path');


var cssfiles = [];

function getFile(url) {

    filename = path.basename(url, '.css');

    if (filename.match(/^[w]{3}/)) {
        filename = 'local';
    };

    if (filename.match(/=/)) {
        filename = 'drfront';
    };

    filename += '.css';

    cssfiles.push(filename);

    request(url).pipe(fs.createWriteStream(path.join('demo', 'css', filename)));

    return filename;

};


// gulp.task('test', function () {
//     var jsdom = require('jsdom').jsdom;
//     document = jsdom('<!doctype html><html><body>hello jsdom</body></html>');
//     window = document.createWindow();
// })


gulp.task('slurp', function () {

    jsdom.env({
        url : 'http://www.ba.no/?ads=placeholder',
        done: function(errors, window) {

            var document = window.document;

            var doctype = window.document.doctype.toString();
            var head = document.head;
            var body = document.body;
            var el = document.createElement.bind(document);

            var browseralert = document.querySelector('#browseralert');


            var removeableElements = document.querySelectorAll('iframe, script, noscript, body > *:not(.apiMultifix), .apiViewportPoint, #apiTopAdContainer, .apiHidden, #apiBackgroundAd, [data-position="vaerknapp"]');

            [].forEach.call(removeableElements, function(element) {
                element.parentNode.removeChild(element);
            });


            // var css = document.querySelectorAll('link[rel=stylesheet]');
            //
            // var urls = [].map.call(css, function(c) {
            //     return c.href;
            // });
            //
            // [].forEach.call(css, function(c, i) {
            //     c.href = path.join('css', getFile(urls[i]));
            // });



            [].forEach.call(document.querySelectorAll('script, noscript, body > *:not(.apiMultifix), .apiViewportPoint, #apiTopAdContainer, .apiHidden, #apiBackgroundAd, [data-position="vaerknapp"]'), function(script) { script.parentNode.removeChild(script) })


            // body.insertBefore(browseralert, document.querySelector('.apiMultifix'));
            // browseralert.style.display = 'block';

            var script = el('script');
            script.src = 'app.js';
            head.appendChild(script);



            var html = doctype + '\n<html>\n' + document.getElementsByTagName('html')[0].innerHTML + '\n</html>';


            fs.writeFile('demo/index.html', html, function (err) {
              if (err) throw err;
              console.log('done');
            });


        }
    });

    
});
