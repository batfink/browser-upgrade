var api = api || {};

api.TravelTipDeck = function TravelTipDeck(config) {

    Object.keys(config).forEach(function(prop) {
        this[prop] = config[prop];
    }.bind(this));

    var url = 'http://services.api.no/api/mushnik/' + this.partner + '/items/' + this.items,
        fragment = document.createDocumentFragment();

    createCORSRequest(url)
        .then(getData)
        .then(JSON.parse)
        .then(buildHTML.bind(undefined, this.el, this.items))
        .catch(handleError.bind(undefined, this.el));

    function handleError(el, error) {
        console.error('Reisetips component failed', error);
        el.parentNode.removeChild(el);
    };

    function createCORSRequest(url) {

        return new Promise(function(resolve, reject) {

            var xhr = new XMLHttpRequest();

            if ('withCredentials' in xhr) {

                xhr.open('GET', url, true);
                resolve(xhr);

            } else if (typeof XDomainRequest != 'undefined') {

                xhr = new XDomainRequest();
                xhr.open('GET', url);
                resolve(xhr);

            } else {
                xhr = null;
                reject(Error('no xhr support'));
            }
        });
    };

    function getData(xhr) {

        return new Promise(function(resolve, reject) {

            xhr.onload = function() {
                if (this.status === 200) {
                    resolve(this.responseText);
                } else {
                    reject(Error(this.status))
                };
            };

            xhr.onerror = function() {
                reject(Error('transfer failed'));
            };

            xhr.ontimeout = function(){
                reject(Error('timeout'));
            };

            xhr.onprogress = function(){};

            setTimeout(function() {
                xhr.send();
            }, 0);

        });
    };


    function buildHTML(el, items, articles) {

        var itemWidth = 100/items;
        var fontSize = 72;

        articles.forEach(function(article) {

            var container = document.createElement('div');
            container.classList.add('amc-traveltip');
            container.setAttribute('style', 'width:' + itemWidth + '%');

            var title = document.createElement('h1');
            title.classList.add('amc-traveltip-title');
            title.setAttribute('style', 'font-size:' + fontSize * (itemWidth/100) + 'px;');
            title.appendChild(document.createTextNode(article.title));

            var img = document.createElement('img');
            img.classList.add('amc-traveltip-image');
            img.setAttribute('style', 'background-image:url(' + article.img + ')');
            img.setAttribute('src', 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAAXNSR0IArs4c6QAAAAxJREFUCB1jYCAZAAAAMwABFXv3/gAAAABJRU5ErkJggg==');

            var link = document.createElement('a');
            link.classList.add('amc-traveltip-link');
            link.setAttribute('href', article.link);
            link.appendChild(img);
            link.appendChild(title);

            var ad = document.createElement('article');
            ad.appendChild(link);

            container.appendChild(ad);
            fragment.appendChild(container);

        });

        el.appendChild(fragment);

    };

};
