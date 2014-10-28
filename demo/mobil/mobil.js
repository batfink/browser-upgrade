var api = api || {};

api.TravelTipDeck = function TravelTipDeck(el) {

    var url = 'articles.json', fragment = document.createDocumentFragment();

    function getJSON(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function() {
            build(JSON.parse(this.responseText))
        };

        xhr.send();
    };

    function build(articles) {

        articles = articles.slice(0, 3);

        articles.forEach(function(article) {

            var wrapper = document.createElement('div');
            wrapper.classList.add('ad-adContainer');

            var articleElement = document.createElement('article');
            articleElement.classList.add('am-ad-item');

            var link = document.createElement('a');
            link.setAttribute('href', article.link);
            link.classList.add('am-articleEntry-link');

            var title = document.createElement('h2');
            title.appendChild(document.createTextNode(article.title));
            title.classList.add('am-label');
            title.classList.add('am-articleEntry-mainTitle');
            title.setAttribute('style', 'padding-top: 6px;');

            var img = document.createElement('img');
            img.setAttribute('src', article.img);
            img.setAttribute('style', 'width: 100%; height: auto');

            link.appendChild(img);
            link.appendChild(title);
            articleElement.appendChild(link);
            wrapper.appendChild(articleElement);
            fragment.appendChild(wrapper);

        });

        el.parentNode.replaceChild(fragment, el);

    };

    getJSON(url);

};
