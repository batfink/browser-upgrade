var gulp = require('gulp');
var request = require('request');
var feed = 'http://reisetips.nettavisen.no/feed/';
var fs = require('fs');
var parseString = require('xml2js').parseString;
var beautify = require('js-beautify').js_beautify

function getFeed() {
    return new Promise(function getFeed(resolve, reject) {
        request(feed, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                resolve(body)
            } else {
                reject(error)
            }
        })
    })
};

function saveXML(data) {
    return new Promise(function(resolve, reject) {
        fs.writeFile('./feed/feed.xml', data, function (err) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        });
    });
};

function convertToJSON(data) {
    return new Promise(function(resolve, reject) {
        parseString(data, function(err, result) {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        });
    });
};

function get3LatestArticles(data) {

    var articles = data.rss.channel[0].item.slice(0, 3);

    var arr = [];

    articles.forEach(function (article) {

        var img = article.enclosure === undefined ? undefined : article.enclosure[0].$.url;

        arr.push({
            title : article.title[0],
            link : article.link[0],
            img : img
        });
    });

    return arr;

};

function saveJSON(data) {
    return new Promise(function(resolve, reject) {
        fs.writeFile('./feed/articles.json', beautify(JSON.stringify(data), { indent_size: 4 }), function (err) {
            if (err) {
                reject(err)
            } else {
                resolve('done')
            }
        });
    });
};

gulp.task('get:feed', function () {
    return getFeed()
        .then(saveXML)
        .then(convertToJSON)
        .then(get3LatestArticles)
        .then(saveJSON)
        .then(console.log.bind(console));
});
