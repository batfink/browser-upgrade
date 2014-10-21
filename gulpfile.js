var gulp = require('gulp');
var request = require('request');
var feed = 'http://reisetips.nettavisen.no/feed/';
var fs = require('fs');
var parseString = require('xml2js').parseString;
var beautify = require('js-beautify').js_beautify
var Promise = require('es6-promise').Promise;


gulp.task('get:feed', function () {

    return new Promise(function(resolve, reject) {
        request(feed, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                resolve(body)
            } else {
                reject(error)
            }
        })
    })
    .then(function saveXMLFile(data) {
        return new Promise(function(resolve, reject) {
            fs.writeFile('./feed/feed.xml', data, function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            });
        });
    })
    .then(function convertToJSON(data) {
        return new Promise(function(resolve, reject) {
            parseString(data, function(err, result) {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            });
        });
    })
    .then(function getArticles(data) {

        var articles = data.rss.channel[0].item.slice(0, 3);

        var arr = [];

        articles.forEach(function (article) {
            arr.push({
                title : article.title[0],
                link : article.link[0],
                img : article.enclosure[0].$.url
            });
        });

        return arr;

    })
    .then(function saveToDisk(data) {
        return new Promise(function(reject, resolve) {
            fs.writeFile('./feed/articles.json', beautify(JSON.stringify(data), { indent_size: 4 }), function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve('done')
                }
            });
        });
    })
    .then(console.log.bind(console));
});
