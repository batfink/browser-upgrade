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
        .then(buildHTML.bind(this))
        .catch(handleError.bind(this));

    function handleError(error) {
        console.error('Reisetips component failed', error);
        this.el.parentNode.removeChild(this.el);
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


    function buildHTML(articles) {

        articles.forEach(function(article) {

            var container = document.createElement('div');
            container.classList.add('am-adContainer');
            container.classList.add('am-ad--travel-tip');

            var ad = document.createElement('article');

            var link = document.createElement('a');

            var title = document.createElement('h1');
            var img = document.createElement('img');

            ad.classList.add('am-ad-item');

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


            ad.appendChild(link);

            container.appendChild(ad);

            fragment.appendChild(container);

        });

        this.el.appendChild(fragment);

    };

};
