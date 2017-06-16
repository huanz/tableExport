var utils = require('./utils');

var rgb2hex = function (rgb) {
    if (rgb.toLowerCase() === 'transparent' || rgb === 'rgba(0, 0, 0, 0)') {
        return '#fff';
    } else if (rgb.search('rgb') === -1) {
        return rgb;
    } else {
        rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);

        function hex(x) {
            return ('0' + parseInt(x).toString(16)).slice(-2);
        }
        return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }
};

var renderSvg = function (svg, callback) {
    var img = new Image();
    var url = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
    var resetEventHandlers = function () {
        img.onload = null;
        img.onerror = null;
    };
    img.onload = function () {
        resetEventHandlers();
        callback(img);
    };
    // img.crossOrigin = 'anonymous';
    img.src = url;
};

module.exports = function (element, options, callback) {
    var width = element.offsetWidth;
    var height = element.offsetHeight + 8;
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    var parser = new DOMParser();
    var doc = parser.parseFromString(element.outerHTML, 'text/html');
    var xhtml = (new XMLSerializer).serializeToString(doc);
    var tpl = '<svg xmlns="http://www.w3.org/2000/svg" width="{{width}}" height="{{height}}"><style scoped="">html::-webkit-scrollbar { display: none; }</style><foreignObject x="0" y="0" width="{{width}}" height="{{height}}" style="float: left;" externalResourcesRequired="true">{{xhtml}}</foreignObject></svg>';
    var svg = utils.template(tpl, {
        width: width,
        height: height,
        xhtml: xhtml
    });
    if (typeof options === 'function') {
        callback = options;
        options = null;
    }
    renderSvg(svg, function (img) {
        if (options && options.format !== 'png') {
            ctx.fillStyle = rgb2hex(element.style.backgroundColor || getComputedStyle(element, null).getPropertyValue('background-color'));
            ctx.fillRect(0, 0, img.width, img.height);
        }
        ctx.drawImage(img, 0, 0);
        callback(canvas);
    });
}