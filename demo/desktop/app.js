var api = api || {};

api.TravelTipDeck = function TravelTipDeck(el) {

    var url = 'articles.json', fragment = document.createDocumentFragment();

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

    function getJSON(url) {
        var xhr = createCORSRequest(url);

        if (!xhr) {
            return;
        };

        xhr.onload = function() {
            build(JSON.parse(this.responseText))
        };

        xhr.onerror = function() {
            console.log('transfer failed');
        };

        xhr.ontimeout = function(){};
        xhr.onprogress = function(){};


        setTimeout(function() {
            xhr.send();
        }, 0);

    };

    function build(articles) {

        articles.forEach(function(article) {

            var articleElement = document.createElement('article');

            var link = document.createElement('a');

            var title = document.createElement('h1');
            var img = document.createElement('img');


            articleElement.setAttribute('class', 'am-ad--travel-tip');
            title.setAttribute('class', 'am-ad--travel-tip-title');

            img.setAttribute('src', 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAAXNSR0IArs4c6QAAAAxJREFUCB1jYCAZAAAAMwABFXv3/gAAAABJRU5ErkJggg==');
            img.setAttribute('style', 'background-image:url(' + article.img + ')');
            //iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAAXNSR0IArs4c6QAAAAxJREFUCB1jYCAZAAAAMwABFXv3/gAAAABJRU5ErkJggg==

            img.setAttribute('class', 'am-ad--travel-tip-image');
            link.setAttribute('href', article.link);
            link.setAttribute('class', 'am-ad--travel-tip-link');


            title.appendChild(document.createTextNode(article.title));
            // title.setAttribute('')

            link.appendChild(img);
            link.appendChild(title);


            articleElement.appendChild(link);

            fragment.appendChild(articleElement);

        });

        el.appendChild(fragment);

    };

    getJSON(url);

};
