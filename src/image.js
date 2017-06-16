var saveAs = require('file-saver').saveAs;
require('blueimp-canvas-to-blob');
var dom2canvas = require('./dom2canvas');

module.exports = function (table, filename) {
    dom2canvas(table, function (canvas) {
        canvas.toBlob(function (b) {
            saveAs(b, filename + '.png');
        });
    });
}