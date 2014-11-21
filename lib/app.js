(function() {

    var ie = (function(){
        var undef, v = 3,div = document.createElement('div'), all = div.getElementsByTagName('i');

        while (
            div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
            all[0]
        );

        return v > 4 ? v : undef;

    }());

    if (ie === undefined) {
        return;
    };

    var fragment = document.createDocumentFragment(),

        icon = 'iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAADzapwJAAAAA3NCSVQICAjb4U/gAAAASFBMVEXTABDztbzgSVrpgIvWGyj////77e764+Xun6TVDBrbND/jW2r2yc799/fZJjHgUFrWESXcNkjwpKzphozUDx375eX77+/ztb1IMlIHAAAACXBIWXMAAAsSAAALEgHS3X78AAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAAJtJREFUGJV1kUsShCAMROOnCaiAivc/6wAS4mLoBfXSBbZJCFXGxuBciNa8NZXDp4eanuTF5o0+2vi1ea3lzDxXWLnYvt3NBbf7PtupPc5hpmECGUk7gENyDVmJuoFb2FIUXIBFOFIQ3IFdOJATvIBL2Kl9Aqfa/SM0TR2DRn4V9Qe/stpOn0ltpzevMynNj0Y1GOxoDaOl/VnxD6I4Bpn08IoaAAAAAElFTkSuQmCC',

        style = [
                    'font-size: 14px',
                    'font-weight: bold',
                    'border-bottom: 1px solid #dadada',
                    'z-index: 2',
                    'width: 100%',
                    'position: relative',
                    'background: #fff url(data:image/png;base64,' + icon + ') 20px 50% no-repeat'
                ],

        div = ['div', { 'style' : style.join(';')}],

        p   = ['p', {'style': 'padding: 10px 20px 10px 49px'}, 'Vi anbefaler at du oppgraderer til siste versjon av ',
                ['a', { 'href' : 'http://windows.microsoft.com/nb-NO/internet-explorer/download-ie' }, 'Internet Explorer'], ', ',
                ['a', { 'href' : 'http://www.google.com/chrome' }, 'Chrome'], ', ',
                ['a', { 'href' : 'http://www.mozilla.org/nb-NO/firefox/new/' }, 'Firefox'], ' eller ',
                ['a', { 'href' : 'http://www.opera.com/download/' }, 'Opera'], '.'
            ];

    if (ie === 9) {
        p.splice(2, 0, '31. desember 2014 slutter vi å støtte Internet Explorer 9. ');
    };

    if (ie < 9) {
        p.splice(2, 0, 'Du bruker en nettleser vi ikke støtter. ');
    };

    div.push(p);

    generateMarkup(fragment, div);

    function generateMarkup(parent, input) {

        if (input instanceof Array) {

            if (typeof input[0] === 'string') {
                var el = document.createElement(input.shift());
                parent.appendChild(el);
                parent = el;
            }

            for (var i = 0, len = input.length; i < len; i++) {
                generateMarkup(parent, input[i]);
            }

        } else if (typeof input === 'string') {

            var txt = document.createTextNode(input);
            parent.appendChild(txt);

        } else {

            for (var attr in input) {
                if (input.hasOwnProperty(attr)) {
                    parent.setAttribute(attr, input[attr]);
                }
            }

        };
    };

    function insertElement() {
        document.body.insertBefore(fragment, document.body.firstChild);
    };


    if (document.readyState == 'complete') {
        insertElement();
    } else {
        document.onreadystatechange = function() {
            if (document.readyState == 'complete') {
                insertElement();
            }
        };
    }

}());
