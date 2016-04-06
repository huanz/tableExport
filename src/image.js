var utils = require('./utils');
var saveAs = require('FileSaver.js/FileSaver').saveAs;
var dataURLtoBlob = require('JavaScript-Canvas-to-Blob');
var renderSvg = function (svg, callback) {
    var img = new Image();
    // var url = URL.createObjectURL(new Blob([svg], {'type': 'image/svg+xml'}));
    var url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    var resetEventHandlers = function () {
        img.onload = null;
        img.onerror = null;
    };
    var cleanUp = function () {
        if (url instanceof Blob) {
            URL.revokeObjectURL(url);
        }
    };
    img.onload = function () {
        resetEventHandlers();
        cleanUp();
        callback(img);
    };
    img.onerror = function () {
        cleanUp();
    };
    img.crossOrigin = 'anonymous';
    img.src = url;
};

var table2canvas = function (canvas, table) {
    
};

module.exports = function (table, filename) {
    var width = table.offsetWidth;
    var height = table.offsetHeight;
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    var parser = new DOMParser();
    var doc = parser.parseFromString(table.innerHTML, 'text/html');
    var xhtml = (new XMLSerializer).serializeToString(doc);

    var tpl = '<svg xmlns="http://www.w3.org/2000/svg" width="{{width}}" height="{{height}}"><foreignObject width="100%" height="100%">{{xhtml}}</foreignObject></svg>';
    var svg = utils.template(tpl, {
        width: width,
        height: width,
        xhtml: xhtml
    });
    renderSvg(svg, function (img) {
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(function (b) {
            saveAs(b, filename + '.png');
        });
    });
}
