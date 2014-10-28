var api = api || {};

api.TravelTipDeck = function TravelTipDeck(config) {

    Object.keys(config).forEach(function(prop) {
        this[prop] = config[prop];
    }.bind(this));

    var url = 'http://services.api.no/api/mushnik/' + this.partner + '/items/' + this.items,
        fragment = document.createDocumentFragment();

    (function getJSON(url) {

        var xhr = createCORSRequest(url);

        if (!xhr) {
            return;
        };

        xhr.onload = function() {
            build.bind(config)(JSON.parse(this.responseText))
        };

        xhr.onerror = function() {
            console.log('transfer failed');
        };

        xhr.ontimeout = function(){};
        xhr.onprogress = function(){};


        setTimeout(function() {
            xhr.send();
        }, 0);

    })(url);



    function createCORSRequest(url) {
        var xhr = new XMLHttpRequest();
        if ('withCredentials' in xhr) {
            xhr.open('GET', url, true);
        } else if (typeof XDomainRequest != 'undefined') {
            xhr = new XDomainRequest();
            xhr.open('GET', url)
        } else {
            xhr = null;
        }
        return xhr;
    };


    function build(articles) {

        articles.forEach(function(article) {

            var articleElement = document.createElement('article');

            var link = document.createElement('a');

            var title = document.createElement('h1');
            var img = document.createElement('img');


            articleElement.classList.add('am-ad-item');
            // articleElement.setAttribute('class', 'am-ad--travel-tip');
            // title.setAttribute('class', 'am-ad--travel-tip-title');

            img.setAttribute('src', 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAAXNSR0IArs4c6QAAAAxJREFUCB1jYCAZAAAAMwABFXv3/gAAAABJRU5ErkJggg==');
            img.setAttribute('style', 'background-image:url(' + article.img + '); background-position: 50% 0; background-size: cover');
            //iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAAXNSR0IArs4c6QAAAAxJREFUCB1jYCAZAAAAMwABFXv3/gAAAABJRU5ErkJggg==

            // img.setAttribute('class', 'am-ad--travel-tip-image');
            link.setAttribute('href', article.link);
            link.classList.add('am-articleEntry-link')
            // link.setAttribute('class', 'am-ad--travel-tip-link');


            title.appendChild(document.createTextNode(article.title));
            title.classList.add('am-label');
            title.classList.add('am-articleEntry-mainTitle');
            title.setAttribute('style', 'padding-top: 6px;');
            // title.setAttribute('')

            link.appendChild(img);
            link.appendChild(title);


            articleElement.appendChild(link);

            fragment.appendChild(articleElement);

        });

        this.el.appendChild(fragment);


    };



};
